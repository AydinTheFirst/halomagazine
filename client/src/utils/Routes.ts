export const Routes = {
  Auth: {
    Me: "/auth/@me",
    Login: "/auth/login",
    Register: "/auth/register",
  },
  Magazines: (id?: string) => {
    if (id) return `/magazines/${id}`;
    return "/magazines";
  },
  Categories: (id?: string) => {
    if (id) return `/categories/${id}`;
    return "/categories";
  },
};
