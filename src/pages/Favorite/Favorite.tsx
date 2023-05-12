import { useFavorite } from "./hooks/useFavorite";

export const Favorite = () => {
  const {} = useFavorite();
  return <div>FAVORITE</div>;
};
