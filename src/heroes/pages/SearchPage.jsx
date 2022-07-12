import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"

export const SearchPage = () => {

  const navigate = useNavigate()
  /** para facilitarnos la lectura de las cadenas
   * haremoos uso de un paquete:
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
  const { searchText, onInputChange } = useForm({
    searchText: ''
  })

  const onSearchSumit = (event) => {
    event.preventDefault();

    if(searchText.trim().length <= 1) return;
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
          <form onSubmit={ onSearchSumit }>
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
          <button className="btn btn-outline-primary mt-1">
            Search
          </button>
        </div>


        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div className="alert alert-primary">
            Search a hero
          </div>
          <div className="alert alert-danger">
            No hero with <b>{ q }</b>
          </div>
          {/* <HeroCard /> */}
        </div>
      </div>
    </>
  )
}
