import { Link } from "react-router-dom"

const CharacterByHero = ({ alter_ego, characters }) => {

    if (alter_ego === characters) return (<></>)

    return (<p>{characters}</p>)
    /** con el ternario
     * return (alter_ego === characters) 
     * ? <></>
     * : <p>{characters}</p>
     */
}

export const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    publisher,
    characters
}) => {

    const heroImageUrl = `/assets/heroes/${id}.jpg`

    /** esto es un jsx */
    //const charactersByHero = (<p>{characters}</p>)

    return (
        /** voy a tener una columna, e internamente una card,shortcut: .card 
         * vamos a insertar una imagen y al costado texto
        */
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={heroImageUrl} alt={superhero} className="card-img" />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                            {
                                /** esta forma de ponerlo puede ser un poco compleja de leer
                                 * 
                                 * ( alter_ego !== characters ) && (<p>{ characters }</p>)
                                 * 
                                 * pero tenemos como opcion, el agregar una constante con
                                 * el componente directamente, o crear otro componente
                                 * cuando este sea muy grande, en caso contrario esta seria
                                 * la opcion:
                                 * (alter_ego !== characters) && charactersByHero
                                 */
                                <CharacterByHero characters={characters} alter_ego={alter_ego}/>
                            }
                            <p className="card-text">
                                <small className="text-muted">{first_appearance}</small>
                            </p>

                            <Link to={`/hero/${id}`}>
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
