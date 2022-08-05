import React from 'react';
import { List, Card, Image, Checkbox, Switch, Space} from "antd";
import Text from "antd/lib/typography/Text";
import pic1 from '../images/LA/Academy-Museum-of-Motion-Pictures-01-B.jpg';
import pic2 from '../images/LA/Griffith_Observatory,_Los_Angeles_2011.jpg';
import pic3 from '../images/LA/universal-studios-hollywood.jpg';
import pic4 from '../images/LA/Disneyland.jpg';
import pic5 from '../images/LA/1993_walk_of_fame_michael_jackson.jpg';
import pic6 from '../images/LA/Walt_Disney_Concert_Hall_LA_CA_22.03.2012.jpg';
import pic7 from '../images/LA/hollywood_museum.jpg';
import pic8 from '../images/LA/Topanga_State_Park,_Trippet_Ranch_entrance.jpeg';
import pic9 from '../images/LA/Santa-Monica-State-Beach-looking-at-the-pier-from-south.jpg';
import pic10 from '../images/LA/getty_center.jpg';
import pic11 from '../images/LA/la_brea_tar_pits_and_museum.jpg';
import pic12 from '../images/LA/petersen_museum.jpg';
import pic13 from '../images/LA/The_Broad_LA_2017.jpg';
import pic14 from '../images/LA/la_county_museum_of_art.jpg';
import pic15 from '../images/LA/zuma_beach.jpg';
import pic16 from '../images/LA/runyon_canyon_park.jpg';
import pic17 from '../images/LA/Los-Angeles-Paramount-Pictures-Tour-Alamy-G0F7W5.jpg';
import pic18 from '../images/LA/venace_beach.jpg';
import pic19 from '../images/LA/California-Science-Center-2.jpg';
import pic20 from '../images/LA/20190609112443_rodeo-drive.jpg';
import POIDetailInfoButton from './POIDetailInfoButton';
import SelectPOI from './SelectPOI';

class Recommendations extends React.Component {

    state = {
        loading: false,
        data: [    {
            id: 1,
            name: 'Academy Museum of Motion Pictures',
            city: 'Los Angeles',
            description: 'A good place 1',      
            address: '6067 Wilshire Blvd., Los Angeles',
            time_taken: '3 hours',
            image: pic1,
            latitude: 34.063333,
            longitude: -118.360833,
          },
          {
            id: 2,
            name: 'Griffith Observatory',
            city: 'Los Angeles',
            description: 'A good place 2',     
            address: '2800 E Observatory Rd., Los Angeles',
            time_taken: '4 hours',
            image: pic2,
            latitude: 34.118611,
            longitude: -118.300278,
          },
          {
            id: 3,
            name: 'Universal Studio Hollywood',
            city: 'Los Angeles',
            description: 'A good place 3',  
            address: '100 Universal City Plaza, Universal City',
            time_taken: '5 hours',
            image: pic3,
            latitude: 34.138117,
            longitude: -118.353378,
          },
          {
            id: 4,
            name: 'Disneyland Park',
            city: 'Los Angeles',
            description: 'A good place 4',
            address: '1313 Disneyland Dr, Anaheim, CA 92802',
            time_taken: '6 hours',
            image: pic4,
            latitude: 33.812511,
            longitude: -117.918976,
          },
          {
            id: 5,
            name: 'Hollywood Walk of Fame',
            city: 'Los Angeles',
            description: 'A good place 5',      
            address: 'Hollywood Boulevard, Vine St, Los Angeles, CA 90028',
            time_taken: '1 hour',
            image: pic5,
            latitude: 34.101639,
            longitude: -118.333694,
          },
          {
            id: 6,
            name: 'Walt Disney Concert Hall',
            city: 'Los Angeles',
            description: 'A good place 6',     
            address: '111 S Grand Ave, Los Angeles, CA 90012',
            time_taken: '4 hours',
            image: pic6,
            latitude: 34.055389,
            longitude: -118.249871,
          },
          {
            id: 7,
            name: 'The Hollywood Museum',
            city: 'Los Angeles',
            description: 'A good place 7',  
            address: '1660 N Highland Ave, Hollywood, CA 90028',
            time_taken: '4 hours',
            image: pic7,
            latitude: 34.101082,
            longitude:  -118.338307,
          },
          {
            id: 8,
            name: 'Topanga State Park',
            city: 'Los Angeles',
            description: 'A good place 8',
            address: '20828 Entrada Rd, Topanga, CA 90290',
            time_taken: '6 hours',
            image: pic8,
            latitude:  34.093182,
            longitude: -118.587318,
          },
          {
            id: 9,
            name: 'Santa Monica State Beach',
            city: 'Los Angeles',
            description: 'A good place 9',  
            address: '1242-1306 Ocean Front Walk, Santa Monica, CA 90401',
            time_taken: '4 hours',
            image: pic9,
            latitude: 34.012903,
            longitude: -118.501724,
          },
          {
            id: 10,
            name: 'Getty Center',
            city: 'Los Angeles',
            description: 'A good place 10',
            address: '1200 Getty Center Dr, Los Angeles, CA 90049',
            time_taken: '5 hours',
            image: pic10,
            latitude: 34.078036,
            longitude: -118.474095,
          },
          {
            id: 11,
            name: 'La Brea Tar Pits and Museum',
            city: 'Los Angeles',
            description: 'A good place 11',
            address: '5801 Wilshire Blvd, Los Angeles, CA 90036',
            time_taken: '4 hours',
            image: pic11,
            latitude: 34.063808,
            longitude: -118.355434,
          },
          {
            id: 12,
            name: 'Petersen Automotive Museum',
            city: 'Los Angeles',
            description: 'A good place 12',
            address: '6060 Wilshire Blvd, Los Angeles, CA 90036',
            time_taken: '5 hours',
            image: pic12,
            latitude: 34.062348,
            longitude: -118.361134,
          },
          {
            id: 13,
            name: 'The Board',
            city: 'Los Angeles',
            description: 'A good place 13',
            address: '221 S Grand Ave, Los Angeles, CA 90012',
            time_taken: '3 hours',
            image: pic13,
            latitude: 34.0545,
            longitude: -118.2502,
          },
          {
            id: 14,
            name: 'Los Angeles County Museum of Art',
            city: 'Los Angeles',
            description: 'A good place 14',
            address: '65905 Wilshire Blvd, Los Angeles, CA 90036',
            time_taken: '2 hours',
            image: pic14,
            latitude: 34.064251,
            longitude: -118.360565,
          },
          {
            id: 15,
            name: 'Zuma Beach',
            city: 'Los Angeles',
            description: 'A good place 15',
            address: '30000 Pacific Coast Highway',
            time_taken: '4 hours',
            image: pic15,
            latitude: 34.021802,
            longitude: -118.831190,
          },
          {
            id: 16,
            name: 'Runyon Canyon Park',
            city: 'Los Angeles',
            description: 'A good place 16',
            address: '2000 N Fuller Ave, Los Angeles, CA 90046',
            time_taken: '4 hours',
            image: pic16,
            latitude: 34.110681,
            longitude: -118.350378,
          },
          {
            id: 17,
            name: 'Paramount Pictures Studio Tour',
            city: 'Los Angeles',
            description: 'A good place 17',
            address: '5515 Melrose Ave, Los Angeles, CA 90038',
            time_taken: '3 hours',
            image: pic17,
            latitude: 34.085565,
            longitude: -118.318688,
          },
          {
            id: 18,
            name: 'Venice Beach',
            city: 'Los Angeles',
            description: 'A good place 18',
            address: '2000 N Fuller Ave, Los Angeles, CA 90046',
            time_taken: '2 hours',
            image: pic18,
            latitude: 33.988270,
            longitude: -118.472023,
          },
          {
            id: 19,
            name: 'California Science Center',
            city: 'Los Angeles',
            description: 'A good place 19',
            address: '700 Exposition Park Dr, Los Angeles, CA 90037',
            time_taken: '3 hours',
            image: pic19,
            latitude: 34.015865,
            longitude: -118.286108,
          },
          {
            id: 20,
            name: 'Rodeo Drive',
            city: 'Los Angeles',
            description: 'A good place 20',
            address: '439 N Rodeo Dr, Beverly Hills, CA 90210, USA',
            time_taken: '2 hours',
            image: pic20,
            latitude: 34.069875,
            longitude: -118.403638,
          },
        ],
      };
     
    // should use props showed+POIList instead of state

    onChange = (POI, checked) => {
      const { selected } = this.props;
      const list = this.addOrRemove(POI,checked,selected);
      this.props.updateSelection(list);
    }

    addOrRemove = (item, checked, list) => {
        const found = this.checkStatus(item,list);
        if (checked && !found) {
            list=[...list, item]
        }

        if (!checked && found) {
            list = list.filter( entry => {
                return entry.id !== item.id;
            });
        }
        return list;
    }

    checkStatus = (item, list) => {
      return list.some(entry => entry.id === item.id);
    }

      render() {
        return (
          <List
            loading={this.state.loading}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={this.state.data}
            // style={{maxHeight: 200, overflow: 'auto'}}
            renderItem={(item) => (
              <List.Item>
                <Card
                  key={item.id}
                  title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Text ellipsis={true} style={{ maxWidth: 300 }}>
                        {item.name}
                      </Text>
                      <POIDetailInfoButton POI={item}/>
                    </div>
                  }
                  cover={<Image src={item.image} width="100%" height="350px"/>}
                  actions={[]}
                  extra={<SelectPOI POI={item} change={this.onChange} planned={this.checkStatus(item,this.props.selected)}/>}
                >
                </Card>
              </List.Item>
            )}
          />
        );
      }

}
export default Recommendations;