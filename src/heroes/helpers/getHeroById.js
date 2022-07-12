import { heroes } from "../data/heroes"

export const getHeroById = ( id ) => {
    /** cuando find no encuentra, regresa undefined */
    return heroes.find( hero=> hero.id === id )

}