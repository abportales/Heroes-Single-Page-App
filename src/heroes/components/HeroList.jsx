import { useMemo } from 'react'
import { getHeroesByPublisher } from '../helpers'
import { HeroCard } from './'

export const HeroList = ({ publisher }) => {

    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher] )

    return (
        <div className='row row-cols-1 row-cols-md-3 g-3'>
            {
                heroes.map( (hero) => (
                    <HeroCard 
                        key={hero.id}
                        /** recordemos que para enviar muchos props, es mejor
                         * hacer la deses directa, y asi evitamos en el comp
                         * hacer la llamada tipo: hero.name, hero.alter_ego etc */ 
                        {...hero} />
                ) )
            }
        </div>
    )
}
