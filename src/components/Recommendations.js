import React from 'react';
import { List, Card, Image, Checkbox, Switch, Space} from "antd";
import Text from "antd/lib/typography/Text";
import pic1 from '../images/LA/Academy-Museum-of-Motion-Pictures-01-B.jpg';
import pic2 from '../images/LA/Griffith_Observatory,_Los_Angeles_2011.jpg';
import pic3 from '../images/LA/universal-studios-hollywood.jpg';
import pic4 from '../images/LA/Disneyland.jpg';
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
            id: 6,
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
            id: 7,
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
            id: 8,
            name: 'Disneyland Park',
            city: 'Los Angeles',
            description: 'A good place 4',
            address: '1313 Disneyland Dr, Anaheim, CA 92802',
            time_taken: '6 hours',
            image: pic4,
            latitude: 33.812511,
            longitude: -117.918976,
          },],
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