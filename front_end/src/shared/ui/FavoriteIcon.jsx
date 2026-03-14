import favoriteActiveIcon from '../assets/icons/favorite-icon.svg'
import favoriteInactiveIcon from '../assets/icons/nonactive-favorite-icon.svg'

export default function FavoriteIcon({ active }) {
  return (
    <img
      src={active ? favoriteActiveIcon : favoriteInactiveIcon}
      width={22}
      height={28}
      alt=""
    />
  )
}
