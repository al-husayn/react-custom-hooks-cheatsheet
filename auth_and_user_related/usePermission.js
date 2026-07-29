//  usePermissions - role based access check
function usePermissions(required = []) {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return false;
    return required.every(p => user.permissions.include(p))
  }, [user, required]);
}