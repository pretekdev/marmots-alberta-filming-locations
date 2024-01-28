import {TextField, Typography, Button } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GoogleMapReact from 'google-map-react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RoomIcon from '@mui/icons-material/Room';



export default class Map extends React.Component {

    constructor(props) {
        super();
        this.state = {
            latitude: 49.6885856,
            longitude: -112.845585,
            locations: [],
            selectedLocationId: null, 
            markerClicked: false, 
            searchText: "", 
            distance: 40,
        }
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    locations: locationData,
        
                })
            },
            (error) => {
                console.log("Error Getting Location: " + error.message)
            }
        )
    }

    header = () => {  
        const handleSearch = () => {
            let fliteredLocations = locationData.filter(g => 
                g.LOC.toLowerCase().includes(this.state.searchText.toLocaleLowerCase()))
            this.setState({
                locations: fliteredLocations
            })
        }

        const resetAll = () => {
            this.setState({
                locations: locationData,
                searchText: "",
            })
        }
        return (
            <div style={{ marginBottom: 10}}> 
                <Typography variant='h4' style={{ textAlign: "center"}}>
                    A L B E R T A - F I L M I N G - L O C A T I O N S - M A R M O T S
                </Typography>
                <TextField label="Search for a location..." value={this.state.searchText} variant="outlined" style={{ width: "100%"}}
                onChange={(event) => {this.setState({ searchText: event.target.value})} }
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    
                    
                </div>
                <div>
                <Button variant="outlined" 
                    onClick={resetAll}
                    style={{ width: "50%"}}>
                    <RestartAltIcon/>
                    Reset</Button>

                <Button variant="contained" onClick={handleSearch} style={{ width: "50%"}}>
                    <SearchIcon />
                    Search
                    </Button>


                </div>


                
            </div>
        )
    }

    Map = () =>{
        const clickedOutside = (x, y, lat, lng, event) => {
            if (this.state.markerClicked === true){
                this.setState({
                    selectedLocationId: null,
                    markerClicked: false,
                })
            }
            else {
                console.log("Clicked on Map")
            }

        }
        return (
            <div style={{ height: "80vh" }}> 
                <GoogleMapReact
                    onClick={() => {this.setState({selectedLocationId: null })}}
                    bootstrapURLKeys={{ key: "AIzaSyC4TG6zs2KUWMnuMMocYfI1Ss9wDO2isd4" }}
                    defaultCenter={{
                        lat: 49.6885856,
                        lng: -112.845585
                    }}
                    defaultZoom={14}
                    center={{
                        lat: this.state.latitude, 
                        lng: this.state.longitude}}
                >
                    {
                        this.state.locations.map((location) => {
                            return (

                                <RoomIcon color={"secondary"} 
                                lat={location.latitude}
                                lng={location.longitude}
                                onClick={() => {this.setState({ selectedLocationId: location.id, markerClicked: true})} }
                                
                                />
                            )
                        })
                    }
                    {
                        this.state.locations.map((location) => {
                            if (this.state.selectedLocationId === location.id) {
                                return(
                                    <div lat={location.latitude}
                                         lng={location.longitude}
                                         style={{backgroundColor: "white", width: 200}}>
                                        <Typography>
                                            {location.name}
                                        </Typography>
                                    </div>
                                )
                            }
                            else{
                                return null
                            }
                        })
                    }
                    

                    <MyLocationIcon color={"primary"}
                    lat={this.state.latitude}
                    lng={this.state.longitude}
                    /> 

                </GoogleMapReact>
            </div>
        )
    }

    render() {
        return (
            <div style={{ backgroundColor: "beige"}}>
                {this.header()}
                {this.Map()}
            </div>
        )
    }
    
}

let locationData = [
    
    {
        id: "77",
        name: "A long Walk to Cross(2016), The BFG (2016), Ararat (2002)", 
        LOC: "Drumheller", 
        latitude: 51.4699,
        longitude: -112.7109,
    },
        {
        id: "78",
        name: "Angels Crest (2011), The Journey of Natty Gann (1985)", 
        LOC: "Crowsnest Pass", 
        latitude: 49.5899,
        longitude: -114.6641,
        },
        {
        id: "79",
        name: "The Final Sacrifice (1990)", 
        LOC: "Cremona", 
        latitude: 51.5437,
        longitude: -114.4903,
        },
        {
        id: "80",
        name: "Rad (1986), Corral (1954)", 
        LOC: "Cochrane Ranch", 
        latitude: 51.1973,
        longitude: -114.4816,
        },
        {
        id: "81",
        name: "Shanghai Noon (2000)", 
        LOC: "CL Ranches", 
        latitude: 51.0635,
        longitude: -114.5477,
        },
        {
        id: "82",
        name: "The Right Kind of Wrong (2013), A Miracle On Christmas Lake (2016), Man Running (2018), Mystery Alaska (1999)", 
        LOC: "Canmore", 
        latitude: 51.0901,
        longitude: -115.3575,
        },
        {
        id: "83",
        name: "Superman (1978)", 
        LOC: "Calgary Tower", 
        latitude: 51.0442,
        longitude: -114.0632,
        },
        {
        id: "84",
        name: "The Lone Ranger (2013), The Resurrection of a Bastard (2013)", 
        LOC: "Calgary", 
        latitude: 51.0486,
        longitude: -114.0708,
        },
        {
        id: "85",
        name: "8 x 10 Tasveer (2009), John Q (2002), Legends of the Fall (1994), Shanghai Knights (2003), Snow Day (2000), Snow Dogs (2002), Superman 3 (1983), When Trumpets Fade (1998), Man Running (2018), Superman 2 (1980)", 
        LOC: "Calgary", 
        latitude: 51.0072,
        longitude: -114.0894,
        },
        {
        id: "86",
        name: "A simple Wish (1997), Alpha(2018), Texas Rangers(2001), Two Brothers, A Girl, and a Gun(1993), Unforgiven(1992)", 
        LOC: "Brooks", 
        latitude: 50.5642,
        longitude: -111.8989,
        },
        {
        id: "87",
        name: "The Fourth War (1990)", 
        LOC: "Bragg Creek", 
        latitude: 50.9520,
        longitude: -114.5682,
        },
        {
        id: "88",
        name: "Legends of the Fall (1994)", 
        LOC: "Bow Valley Provincial Park", 
        latitude: 51.0146,
        longitude: -115.2919,
        },
        {
        id: "89",
        name: "Superman (1978)", 
        LOC: "Blackie", 
        latitude: 51.5242,
        longitude: -113.5583,
        },
        {
        id: "90",
        name: "Anatomy of a Hate Crime (2001), Badland (2019), February's Dog (2022), The Great Fear (2016)", 
        LOC: "Black Diamond", 
        latitude: 50.6857,
        longitude: -114.2524,
        },
        {
        id: "91",
        name: "Saskatchewan (1954)", 
        LOC: "Banff National Park", 
        latitude: 51.2315,
        longitude: -115.5238,
        },
        {
        id: "92",
        name: "Borealis (2020)", 
        LOC: "Banff National Park", 
        latitude: 51.5242,
        longitude: -115.9168,
        },
        {
        id: "93",
        name: "The Edge (1997)", 
        LOC: "Banff", 
        latitude: 51.05242,
        longitude: -115.9168,
        },
        {
        id: "94",
        name: "Grotesque I (2022), Running Brave (1983), Hello Mary Lue: Prom Night II (1987), Metallica Through the Never (2013), Puppy Love (2012), Santas Slay (2005), Skinamarink (2022), Small Sacrifices (1989), Snow Day (2000), The Arrangement (1969), The Assassination of Jesse James (2007), The Demented (2021), War Bride (2001), White Coats (2004)", 
        LOC: "Edmonton",
        latitude: 53.5340,
        longitude: -113.4974,
        },
        {
        id: "95",
        name: "The Assassination of Jesse James (2007)",
        LOC: "Calgary", 
        latitude: 51.0445,
        longitude: -114.0649,
        },
        {
        id: "96",
        name: "Brokeback Mountain (2005), Ghostbusters: Afterlife (2021), Interstellar (2014), Let Him Go (2020), Passchendaele (2008), The Young and Prodigious T.S. Spivet (2013)", 
        LOC: "Fort MacLeod", 
        latitude: 49.7223,
        longitude: -113.4049,
        },
        {
        id: "97",
        name: "The Exorcism of Emily Rose (2005), The Art of War (2000)", 
        LOC: "Edmonton", 
        latitude: 53.5461,
        longitude: -113.4909,
        
        },
        {
        id: "98",
        name: "Gregoire (2017)", 
        LOC: "Fort McMurray", 
        latitude: 56.7272,
        longitude: -111.3787,
        },
        {
        id: "99",
        name: "Cold Pursuit (2019), Inception (2010), Jumanji: The Next Level (2019), The Bourne Legacy (2012), The Claim (2000), The Revenant (2015), Togo (2019), War for the Planet of the Apes (2017)", 
        LOC: "Fortress Mountain", 
        latitude: 50.8283,
        longitude: -115.2433,
        },
        {
        id: "100",
        name: "Dreamcatcher (2003)", 
        LOC: "Grand Cache", 
        latitude: 55.1694,
        longitude: -118.7944,
        },
        {
        id: "101",
        name: "Chautauqua Girl (1983)",
        LOC: "Calgary", 
        latitude: 50.9814,
        longitude: -114.0948,
        },
        {
        id: "102",
        name: "The Horse Whisperer (1998)", 
        LOC: "Okotoks", 
        latitude: 50.5788,
        longitude: -113.8686,
        },
        {
        id: "103",
        name: "Spiral (2021)", 
        LOC: "Irricana", 
        latitude: 51.3215,
        longitude: -113.6037,
        },
        {
        id: "104",
        name: "Strikers Mountain (1985), Borealis (2020), Rose Marie (1954)", 
        LOC: "Jasper National Park", 
        latitude: 52.8739,
        longitude: -118.0812,
        },
        {
        id: "105",
        name: "Man Running (2018)", 
        LOC: "Kananaskis", 
        latitude: 51.1832,
        longitude:-115.0182,
        },
        {
        id: "106",
        name: "Dr. Zhivago (1965), Where the North Wind Blows (1974)", 
        LOC: "Lake Lousie", 
        latitude: 51.4197,
        longitude: -116.1930,
        },
        {
        id: "107",
        name: "Alberta Haunts (2020), Carisa Hendrix: Girl on Fire (2016), Common Chord (2013), Days of Heaven (1978), Finders Keepers (1984), Hold the Dark (2018), Interstellar (2014), Locusts (2019), Prairie Dog (2015), Rollerball (1975), RV (2006), Sanam Re (2016), Stone Coats (1996), The March West (1999), The Young and Prodigious T.S. Spivet (2013)", 
        LOC: "Lethbridge", 
        latitude: 49.6942,
        longitude: -112.8328,
        },
        {
        id: "108",
        name: "Jasmine Road (2020), Unforgiven (2013)", 
        LOC: "Longview", 
        latitude: 50.5325,
        longitude: -114.2314,
        },
        {
        id: "109",
        name: "River of No Return (1954)", 
        LOC: "Maligne River", 
        latitude: 52.9300,
        longitude: -118.0344,
        },
        {
        id: "110",
        name: "An Unfinished Life (2005), One Week (2008)", 
        LOC: "Medicine Hat", 
        latitude: 50.0417,
        longitude: -110.6775,
        },
        {
            id: "111",
            name: "RV (2006)", 
            LOC: "Milk River", 
            latitude:49.1519,
            longitude: -112.1221,
        },
        {
            id: "112",
            name: "Land (2021)", 
            LOC: "Moose Mountain", 
            latitude: 50.9395,
            longitude: -114.8377,
            },
            {
            id: "113",
            name: "Brokeback Mountain (2005), Little Big Man (1970)", 
            LOC: "Morley/ Seebe", 
            latitude: 51.1626,
            longitude: -114.8504,
            },
            {
            id: "114",
            name: "Gunsmoke: Return to Dodge (1987)", 
            LOC: "Mount Yamnuska", 
            latitude: 51.1252,
            longitude: -115.1190,
            },
            {
            id: "114",
            name: "The Last Trapper (2004)", 
            LOC: "Edmonton", 
            latitude: 55.1694,
            longitude: -118.7944,
            },
            {
            id: "115",
            name: "A Gentleman (2017)", 
            LOC: "Okotoks", 
            latitude:50.7194,
            longitude: -113.9667,
            },
            {
            id: "116",
            name: "Brokeback Mountain (2005)", 
            LOC: "Calgary", 
            latitude: 50.9707,
            longitude: -114.0725,
            },
            {
            id: "117",
            name: "The Assassination of Richard Nixon (2004), The Four Horseman (2012), The Hunted (2003)", 
            LOC: "Red Deer", 
            latitude: 52.2681,
            longitude: -113.8112,
            },
            {
            id: "118",
            name: "Interstellar (2014)", 
            LOC: "Okotoks", 
            latitude: 50.7185,
            longitude: -113.9466,
            },
            {
            id: "119",
            name: "Klondike (2022)", 
            LOC: "Spray Lakes Reservoir", 
            latitude: 50.9299,
            longitude: -115.3309,
            },
            {
            id: "120",
            name: "Burn your Maps (2016), Open Range (2003)", 
            LOC: "Stoney Indian Reserve",
            latitude: 51.1832,
            longitude: -115.0182,
            },
            {
            id: "121",
            name: "A Winter Getaway (2021), Alive (1993), Bekhudi (1992), Birth of a Family (2017), Carving the White(1993), Days of Heaven(1978), Deadline of Murder (1946), Death Hunt(1981), Dr.Strangelove (1964), Drawing Home (2016), Ghost Keeper (1981), King of the Grizzlies (1970), Koi Mil Gaya (2003), Last of the Dogmen (1995), Lost and Found (2016), Lunch with Charles (2001), Mustang Country (1976), Mystery Alaska (1999), Nikki, Wild Dog of the North (1961), No Guts No Glory (1989), One Week (2008), River of No Return (1954), The Edge (1997), The High Country (1981), The Inner Voice (1995), The Right Kind of Wrong (2013), Touched by love (1980), When the North Wind Blows (1974), Coli (1983), The Virgin Queen of St. Francis High (1987),Why Can't I be a Movie Star (2001)", 
            LOC: "Banff National Park",
            latitude: 51.1787,
            longitude: -115.5711,
            },
            {
            id: "122",
            name: "Pioneer Woman (1973)", 
            LOC: "Twin Butte",
            latitude: 49.2624,
            longitude: -113.8585,
            },
            {
            id: "123",
            name: "Trekkies (1997)", 
            LOC: "Vulcan",
            latitude: 50.4048,
            longitude: -113.2606,
            },
            {
            id: "124",
            name: "The Final Sacrifice (2022)", 
            LOC: "Water Valley",
            latitude: 51.5051,
            longitude: -114.6099,
            },
            {
            id: "125",
            name: "Days of Heaven (1978), Excess Baggage (1997), Samurai Cowboy (1994), Showdown at Williams Creek (1991), Where the Spirit Lives (1989), Wild Horse Hank (1979)", 
            LOC: "Waterton Lakes National Park",
            latitude: 49.0510,
            longitude: -113.9173,
            },
            {
            id: "126",
            name: "Cool Runnings (1993)", 
            LOC: "Calgary",
            latitude: 51.0811,
            longitude: -114.2157,
            },
            {
            id: "127",
            name: "Borealis (2015)", 
            LOC: "Wood Buffalo National Park",
            latitude: 59.4396,
            longitude: -112.8765,
            },
            
        
        
            
        
        
]