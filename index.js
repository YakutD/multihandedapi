const _ = require('lodash');

//api lists
const weather = require('./modules/weather');
const currency = require('./modules/currency');
const country = require('./modules/country');
const ipinfo = require('./modules/ipinfo');
const music = require('./modules/music');


let {
    // Здесь базовые типы GraphQL, которые нужны в этом уроке
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    /* Это необходимо для создания требований
       к полям и аргументам */
    GraphQLNonNull,
    // Этот класс нам нужен для создания схемы
    GraphQLSchema
} = require('graphql');


////////////////////////////
/////////// Weather
const WeatherType = new GraphQLObjectType({
    name: "Weather",
    description: "Current weather for city",
    fields: () => ({
        city: {
            type: new GraphQLNonNull(GraphQLString),
            description: "English name of city"
        },
        country: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Code of country"
        },
        mod: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Temperature units mod"
        },
        main: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Statement of weather at the moment"
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Description of statement of weather"
        },
        temp: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Current temperature in city at the moment"
        },
        feels_like: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "How temperature feels like"
        },
        wind_speed: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Speed of wind"
        },
        pressure: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Atmospheric pressure, hPa"
        },
        humidity: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Humidity, %"
        },
        clouds: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Cloudiness, %"
        }
    })
});
/////////// End
////////////////////////////



////////////////////////////
/////////// Currency
const CurrencyType = new GraphQLObjectType({
    name: "Currency",
    description: "Course of base currency relate to other symbols. All currency code must be in uppercase.",
    fields: () => ({
        base: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Base currency. Default - EUR."
        },
        symbols: {
            type: new GraphQLNonNull(new GraphQLList(SymbolType)),
            description: "Symbols list"
        },
    })
});

const SymbolType = new GraphQLObjectType({
    name: "Symbols",
    description: "Course of base currency relate to other symbols",
    fields: () => ({
        title: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Symbol title"
        },
        value: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Course value"
        },
    })
});
/////////// End
////////////////////////////



////////////////////////////
/////////// Country
const CountryType = new GraphQLObjectType({
    name: "Country",
    description: "Current weather for city",
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Country's name"
        },
        topLevelDomain: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: "List of country domains"
        },
        callingCodes: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
            description: "List of country calling codes"
        },
        capital: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Country's capital"
        },
        altSpellings: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: "List of alternative country names"
        },
        region: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Country's region"
        },
        population: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Amount of people"
        },
        demonym: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Country's demonym"
        },
        area: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Square of country"
        },
        timezones: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: "List of country timezones"
        },
        borders: {
            type: new GraphQLList(GraphQLString),
            description: "List of iso codes of country neigbors"
        },
        nativeName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Native name"
        },
        numericCode: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Country is numeric code"
        },
        flag: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Link for SVG image of country flag"
        },
        currencies: {
            type: new GraphQLNonNull(new GraphQLList(CountryCurrencyType)),
            description: "List of currencies this country use"
        },
        regionalBlocs: {
            type: new GraphQLList(RegionalBlockType),
            description: "List of regional blocks this country inside"
        },
        languages: {
            type: new GraphQLNonNull(new GraphQLList(CountryLanguageType)),
            description: "List of languages this country use"
        },
    })
});


const RegionalBlockType = new GraphQLObjectType({
    name: "RegionalBlock",
    description: "Regional Block",
    fields: () => ({
            acronym: {
                type:  new GraphQLNonNull(GraphQLString),
                description: "Acronym of regional block"
            },
            name: {
                type:  new GraphQLNonNull(GraphQLString),
                description: "Name of regional block"
            }
    })
});


const CountryLanguageType = new GraphQLObjectType({
    name: "LanguageOfCountry",
    description: "List of languages of country",
    fields: () => ({
            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: "English name of language"
            },
            nativeName: {
                type: new GraphQLNonNull(GraphQLString),
                description: "Native name of language"
            }
    })
});


const CountryCurrencyType = new GraphQLObjectType({
    name: "CurrencyOfCountry",
    description: "Currency of country",
    fields: () => ({
        code: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Code of currency"
        },
        name: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Name of currency"
        },
        symbol: {
            type: GraphQLString,
            description: "Sign of currency"
        },
    
    })
});
/////////// End
////////////////////////////



////////////////////////////
/////////// Ip
const IpType = new GraphQLObjectType({
    name: "IpInfo",
    description: "Info about IP",
    fields: () => ({
        ip: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "IP"
        },
        country: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Country"
        },
        countryCode: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Country code"
        },
        region: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Region code"
        },
        regionName: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Region name"
        },
        city: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "City"
        },
        zip: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "ZIP Code"
        },
        lat: {
            type:  new GraphQLNonNull(GraphQLFloat),
            description: "Latitude"
        },
        lon: {
            type:  new GraphQLNonNull(GraphQLFloat),
            description: "Longitude"
        },
        timezone:{
            type:  new GraphQLNonNull(GraphQLString),
            description: "Timezone"
        },
        isp:{
            type:  new GraphQLNonNull(GraphQLString),
            description: "Internet Service Provider"
        },
        org: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Provider Organization"
        },
    
    })
});
/////////// End
////////////////////////////




////////////////////////////
/////////// Music
const MusicType = new GraphQLObjectType({
    name: "TopOfMusic",
    description: "List of tracks sorted by desc of popularity",
    fields: () => ({
        tracks: {
            type: new GraphQLNonNull(new GraphQLList(TrackType)),
            description: "Tracks list"
        },
    })
});

const TrackType = new GraphQLObjectType({
    name: "MusicTrack",
    description: "Music track",
    fields: () => ({
        track: {
            type:  new GraphQLNonNull(GraphQLString),
            description: "Track name"
        },
        artist: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Artist"
        },
        listeners: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Amount of listeners"
        },
        playcount: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Play count"
        },
    })
});
/////////// End
////////////////////////////




const MultihandedAPIQueryRootType = new GraphQLObjectType({
    name: "MultihandedAPIShema",
    description: "Shema for MultihandedAPI",
    fields: () => ({
        weather: {
            type: WeatherType,
            description: "Data of weather for city u need. Provider - openweathermap.org .",
            args: {
                key: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "Key for API"
                },
                city: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "City. Required. Handle "
                },
                mod: {
                    type: GraphQLString,
                    description: "Units of temperature. Default - Kelvin."
                },
                lang:{
                    type: GraphQLString,
                    description: "Code of language of output. Languages which supports by api provider: https://openweathermap.org/current#multi . Default is English. Notice, we are dont guarant that provider localised all data in language u choosed."
                }
            },
            resolve: async (_, {
                key,
                city,
                mod,
                lang
  
            }) => {
                let data = await weather(key,city, mod,lang);
                return data;
            }
        },
        currency: { 
            type: CurrencyType,
            description: "Currency compare. Provider - min-api.cryptocompare.com .",
            args: {
                key: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "Key for API"
                },
                base: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "Base currency. Required."
                },
                symbols: {
                    type:  new GraphQLNonNull(new GraphQLList(GraphQLString)),
                    description: "List of symbols u need get course. At least must be one symbol. It can be and real and crypto currency codes"
                }
            },
            resolve: async (_, {
                key,
                base,
                symbols
            }) => {
                let data = await currency(key,symbols,base);
                return data;
            }
        },
        country: { 
            type: CountryType,
            description: "Country information. Provider - restcountries.eu .",
            args: {
                code: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "ISO 3166-1 2-letter or 3-letter country code. Required."
                }
            },
            resolve: async (_, {
                code
            }) => {
                let data = await country(code);
                return data;
            }
        },
        ipinfo: { 
            type: IpType,
            description: "IP information. Provider - ip-api.com .",
            args: {
                ip: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "IP. Required."
                }
            },
            resolve: async (_, {
                ip
            }) => {
                let data = await ipinfo(ip);
                return data;
            }
        },
        music: { 
            type: MusicType,
            description: "Top of world music chart. Provider - last.fm .",
            args: {
                key: {
                    type:  new GraphQLNonNull(GraphQLString),
                    description: "Key for API"
                },
                limit: {
                    type:  GraphQLInt,
                    description: "Limit of sample. Default - 50."
                }
            },
            resolve: async (_, {
                key,
                limit
            }) => {
                let data = await music(key,limit);
                return data;
            }
        },

    })
});

const MultihandedAPISchema = new GraphQLSchema({
    query: MultihandedAPIQueryRootType
});

module.exports = MultihandedAPISchema;