# frozen_string_literal: true

class FormatAddressesService
  class << self
    def call(restaurant)
      @restaurant = restaurant
      @source = restaurant.source
      @address = restaurant.address
      return if need_to_be_update?
      return if restaurant.address.nil?

      fill_fields
    end

    private

    def fill_fields
      if @source == 'foodin'
        fill_address_column_cleanly_foodin
      elsif @source == 'restopolitain'
        fill_address_column_cleanly_restopolitain
      elsif @source == 'restovisio'
        fill_address_column_cleanly_restovisio
      else
        fill_address_column_cleanly
      end
    end

    def retrieve_city(zip_code)
      address_split = @address.delete(zip_code).split(',')
      return address_split[-1] if @source == 'justeat'
      return address_split[1] if @source == 'deliveroo'

      ''
    end

    def fill_address_column_cleanly_foodin
      address_split = @address.split(',')
      zip_code = address_split[1].match(/(.*?)(\d+)/)[2]
      city = address_split[1].delete(zip_code)
      street = address_split.shift
      department = DEPARTMENTS[zip_code.first(2)]

      @restaurant.update(zip_code: zip_code, city: city.strip,
                         street: street, department: department)
    end

    def fill_address_column_cleanly_restopolitain
      address_split = @address.split(',')
      zip_code = address_split[2].match(/(.*?)(\d+)/)[2]
      city = address_split.last.split.last
      street = address_split.first(2).join.strip
      department = DEPARTMENTS[zip_code.first(2)]

      @restaurant.update(zip_code: zip_code, city: city.strip,
                         street: street, department: department)
    end

    def fill_address_column_cleanly_restovisio
      city = @address.split.last.strip
      zip_code = @address.chomp(city).split.last.strip
      street = @address.chomp(city).strip
      department = DEPARTMENTS[zip_code.first(2)]

      @restaurant.update(zip_code: zip_code, city: city,
                         street: street.chomp(zip_code).strip, department: department)
    end

    def fill_address_column_cleanly
      zip_code = @address.last(5).strip
      city = retrieve_city(zip_code).strip
      street = @address.split(',')[0].strip
      department = DEPARTMENTS[zip_code.first(2)]

      @restaurant.update(zip_code: zip_code, city: city.capitalize,
                         street: street, department: department)
    end

    def need_to_be_update?
      restaurant = @restaurant
      restaurant.zip_code_changed? ||
        restaurant.city_changed? ||
        restaurant.street_changed?
    end


    DEPARTMENTS = {
      '01' => 'Ain',
      '02' => 'Aisne',
      '03' => 'Allier',
      '04' => 'Alpes-de-Haute-Provence',
      '05' => 'Hautes-Alpes',
      '06' => 'Alpes-Maritimes',
      '07' => 'Ardèche',
      '08' => 'Ardennes',
      '09' => 'Ariège',
      '10' => 'Aube',
      '11' => 'Aude',
      '12' => 'Aveyron',
      '13' => 'Bouches-du-Rhône',
      '14' => 'Calvados',
      '15' => 'Cantal',
      '16' => 'Charente',
      '17' => 'Charente-Maritime',
      '18' => 'Cher',
      '19' => 'Corrèze',
      '2B' => 'Haute-Corse',
      '2A' => 'Corse-du-Sud',
      '21' => "Côte-d'Or",
      '22' => "Côtes-d'Armor",
      '23' => 'Creuse',
      '24' => 'Dordogne',
      '25' => 'Doubs',
      '26' => 'Drôme',
      '27' => 'Eure',
      '28' => 'Eure-et-Loire',
      '29' => 'Finistère',
      '30' => 'Gard',
      '31' => 'Haute-Garonne',
      '32' => 'Gers',
      '33' => 'Gironde',
      '34' => 'Hérault',
      '35' => 'Ille-et-Vilaine',
      '36' => 'Indre',
      '37' => 'Indre-et-Loire',
      '38' => 'Isère',
      '39' => 'Jura',
      '40' => 'Landes',
      '41' => 'Loir-et-Cher',
      '42' => 'Loire',
      '43' => 'Haute-Loire',
      '44' => 'Loire-Atlantique',
      '45' => 'Loiret',
      '46' => 'Lot',
      '47' => 'Lot-et-Garonne',
      '48' => 'Lozère',
      '49' => 'Maine-et-Loire',
      '50' => 'Manche',
      '51' => 'Marne',
      '52' => 'Haute-Marne',
      '53' => 'Mayenne',
      '54' => 'Meurthe-et-Moselle',
      '55' => 'Meuse',
      '56' => 'Morbihan',
      '57' => 'Moselle',
      '58' => 'Nièvre',
      '59' => 'Nord',
      '60' => 'Oise',
      '61' => 'Orne',
      '62' => 'Pas-de-Calais',
      '63' => 'Puy-de-Dôme',
      '64' => 'Pyrénées-Atlantiques',
      '65' => 'Hautes-Pyrénées',
      '66' => 'Pyrénées-Orientales',
      '67' => 'Bas-Rhin',
      '68' => 'Haut-Rhin',
      '69' => 'Rhône',
      '70' => 'Haute-Saône',
      '71' => 'Saône-et-Loire',
      '72' => 'Sarthe',
      '73' => 'Savoie',
      '74' => 'Haute-Savoie',
      '75' => 'Paris',
      '76' => 'Seine-Maritime',
      '77' => 'Seine-et-Marne',
      '78' => 'Yvelines',
      '79' => 'Deux-Sèvres',
      '80' => 'Somme',
      '81' => 'Tarn',
      '82' => 'Tarn-et-Garonne',
      '83' => 'Var',
      '84' => 'Vaucluse',
      '85' => 'Vendée',
      '86' => 'Vienne',
      '87' => 'Haute-Vienne',
      '88' => 'Vosges',
      '89' => 'Yonne',
      '90' => 'Territoire de Belfort',
      '91' => 'Essonne',
      '92' => 'Haut-de-Seine',
      '93' => 'Seine-Saint-Denis',
      '94' => 'Val de Marne',
      '95' => "Val d'Oise"
    }.freeze

  end
end
