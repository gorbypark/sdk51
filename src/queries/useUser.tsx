import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const userInfoFn = async (token: string): Promise<UserInfo> => {
  console.log("fetch user info queryfn", token);
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

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUserFn(email, password),
    onSuccess: async (data) => {
      console.log("success!");
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

const useFetchUserView = () => {
  const token = useQueryClient().getQueryData<string>(["token"]);

  return useQuery<UserInfo>({
    queryKey: ["userInfo"],
    queryFn: () => userInfoFn(token!),
    enabled: !!token, // Only run if we have a token
    refetchInterval: 15000, // 15 seconds!! only for demonstration purposes right now
  });
};

const useUserInfo = () => {
  const { data, isLoading } = useFetchUserView();
  const token = useQueryClient().getQueryData<string>(["token"]);

  return {
    isLoading: isLoading,
    token,
    isLoggedIn: !!token,
    rol: data?.data.rol,
    usuarioId: data?.data.id,
    empresaId: data?.empresa.empresa_id,
  };
};

export { useLogin, useUserInfo };
