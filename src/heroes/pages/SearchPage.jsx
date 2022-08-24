import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHeroesByName } from "../helpers"

export const SearchPage = () => {

  const navigate = useNavigate()
  /** para facilitarnos la lectura de las cadenas
   * haremos uso de un paquete:
   * yarn add query-string
   * agregamos la libreria
   * import queryString from 'query-string'
   */
  const location = useLocation()

  /** ese search es un atributo, podemos verlo con el
   * console.log({location})
   */
  const query = queryString.parse (location.search)
  /** solo tomaremos la q, y si no viene sera un string vacio */
  const { q = ''} = query
  const heroes = getHeroesByName(q)

  const showSearch = (q.length===0) //recordemos q esto ya regresa un boolean
  const showError = (q.length > 0) && (heroes.length === 0)

  const { searchText, onInputChange } = useForm({
    /** esto se hace para mantener, la data de la busqueda al actualizar */
    searchText: q
  })

  const onSearchSumit = (event) => {
    event.preventDefault();

    //if(searchText.trim().length <= 1) return;
    /** lo que hacemos es, "redireccionarnos" a la misma ruta, pero
     * con un query parameter, en este caso, lo que el usuario introdujo
     * de busqueda     
     * estas serian unas opciones de validacion:
     *  searchText.toLowerCase().trim()*/
    navigate(`?q=${ searchText }`)
  }


  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching...</h4>
          <hr />
          <form 
            aria-label="form"
            onSubmit={ onSearchSumit }>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
          </form>
          <button onClick={onSearchSumit} className="btn btn-outline-primary mt-1">
            Search
          </button>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div 
            className="alert alert-primary animate__animated animate__fadeIn" 
            style={{ display: showSearch ? '' : 'none'}}
          > 
            Search a hero
          </div>

          <div 
            aria-label="divAlert"
            className="alert alert-danger animate__animated animate__fadeIn" 
            style={{ display: showError ? '' : 'none'}}
          >  
            No hero with <b>{ q }</b> 
          </div>
          
          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero}/>
            ))
          }
        </div>
      </div>
    </>
  )
}


{/* esta es una opcion pero no muy agradable a la vista y
al entendimiento{
  ( q === '' )
  ? <div className="alert alert-primary"> Search a hero </div>
  : (heroes.length === 0 ) && <div className="alert alert-danger"> No hero with <b>{ q }</b> </div>
} 
  otra es jugar con styles del display

  <div className="alert alert-primary" style={{ display: q!== '' ? 'none' : ''}}> 
  Search a hero
</div>
*/}