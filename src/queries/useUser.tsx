import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "expo-router";

type LoginResponse = {
  data: {
    access_token: string;
  };
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  data: {
    rol: number;
    id: number;
  };
  empresa: {
    empresa_id: number;
  };
};

// Query function for signing in the user
const loginUserFn = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(
    "http://api.controldejornadalaboral.loc:8080/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Mutation function for getting user/view
const userInfoFn = async (token: string): Promise<UserInfo> => {
  const response = await fetch(
    "http://api.controldejornadalaboral.loc:8080/user/view",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
};

// Mutation for user/login
const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUserFn(email, password),
    onSuccess: async (data) => {
      await queryClient.setQueryData(["token"], data.data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
    },
    onError: (err) => {
      alert(err);
    },
  });
};

// Clears the queries and sets token to null, this will trigger a redirect back to the sign in page
const useSignOut = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    queryClient.removeQueries({ queryKey: ["userInfo"] });

    queryClient.invalidateQueries({ queryKey: ["token"] });
    queryClient.setQueryData(["token"], null);
  };
};
// Query that gets user/view
const useUserView = () => {
  const token = useQueryClient().getQueryData<string>(["token"]);

  return useQuery<UserInfo>({
    queryKey: ["userInfo"],
    queryFn: () => userInfoFn(token!),
    enabled: !!token, // Only run if we have a token
    refetchInterval: 15000, // 15 seconds!! only for demonstration purposes right now
  });
};

// Returns a blend of user/login data (the token), user/view data (rol, empresa_id, usuario_id, etc) and a boolean for isLoggedIn
const useUserInfo = () => {
  const { data, isFetching } = useUserView();
  const token = useQueryClient().getQueryData<string>(["token"]);

  return {
    isLoggedIn: !!token,
    token: token ?? null,
    isLoading: isFetching,
    rol: data?.data.rol ?? null,
    usuarioId: data?.data.id ?? null,
    empresaId: data?.empresa.empresa_id ?? null,
  };
};

// Redirects the user based on their role.
const useRedirectByRol = () => {
  const data = useUserInfo();
  const router = useRouter();

  return useEffect(() => {
    if (data.rol !== null) {
      switch (data.rol) {
        case 0:
          router.replace("/(app)/(worker)/");
          break;
        case 1:
          router.replace("/(app)/(admin)/");
          break;
        case 2:
          router.replace("/(app)/(manager)/");
          break;
        case 4:
          alert("pin not supported");
        default:
          alert("default");
      }
    }
  }, [data.rol]);
};

// Redirects user on successful sign in
const useRedirectOnSignIn = () => {
  const data = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (data.token) {
      router.replace("/(app)/");
    }
  }, [data.token]);
};

export {
  useSignIn,
  useSignOut,
  useUserInfo,
  useRedirectByRol,
  useRedirectOnSignIn,
};
