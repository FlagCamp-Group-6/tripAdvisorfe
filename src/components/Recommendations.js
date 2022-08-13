import React from 'react';
import { List, Card, Image } from "antd";
import Text from "antd/lib/typography/Text";
import POIDetailInfoButton from './POIDetailInfoButton';
import SelectPOI from './SelectPOI';

class Recommendations extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
    }
  }

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

    filterByID = (item) => {
      const {showed} = this.props;
      for (let i=0;i<showed.length;i++) {
        if (item.id===showed[i]) {return true;}
      }
      return false;
    }

    getShowed = (list) => {
      // return list.filter(this.filterByID);
      const {POIList, showed} = this.props;
      const newlist = [];
      for (let i=0;i<showed.length;i++) {
        for (let j=0;j<POIList.length;j++){
          if (POIList[j].id==showed[i]) {
            newlist[i]=POIList[j];
            break;
          }
        }
      }
      return newlist;
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
            // dataSource={this.state.data}
            dataSource = {this.getShowed(this.props.POIList)}
            style={{maxHeight: 1500, overflow: 'auto'}}
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
                  cover={<Image src={item.images[0].url} width="100%" height="400px"/>}
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