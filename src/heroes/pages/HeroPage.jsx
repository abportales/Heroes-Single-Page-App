import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers";

export const HeroPage = () => {

  /** segmentos de un url o argumentosUrl se obtiene del routes, 
   * es lo que viene despues del ':' en la ruta */
  const params = useParams();
  const { id } = params

  /** para evitar estar renderizando componentes inutilmente
   * el useMemo nos ayuda a que solo renderizemos con la condicion
   * [], que en este caso sera, cuando el id sea diferente   */
  const hero = useMemo( () => getHeroById(id), [id] );

  const navigate = useNavigate()

  const onNavigateBack = () => {
    /** lo manda a la anterior */
    navigate(-1)
  }


  if (!hero) {
    return <Navigate to="/marvel" />
  }

  return (
    /** mt-5: margin-top de 5 
     * img-thumbnail: pone borde a la imagen
    */
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/img/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego} </li>
          <li className="list-group-item"> <b>Publisher:</b> {hero.publisher} </li>
          <li className="list-group-item"> <b>First Appearence:</b> {hero.first_appearance} </li>
        </ul>
        <h5 className="mt-3"> Characters </h5>
        <p>{hero.characters}</p>

        <button 
          className="btn btn-outline-primary"
          onClick={ onNavigateBack }
        >
            Back
        </button>
      </div>
    </div>
  )
}
