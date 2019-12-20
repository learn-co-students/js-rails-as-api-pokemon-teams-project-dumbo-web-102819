class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])

        render json: PokemonSerializer.new(pokemon).to_json
    end 
    def destroy
        pokemon = Pokemon.find(params[:id])
        # sPokemon = PokemonSerializer.new(pokemon).to_json
        pokemon.destroy

        render json: PokemonSerializer.new(pokemon).to_json
    end 
end
