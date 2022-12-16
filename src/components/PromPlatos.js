import React, {Component} from "react";
import HeaderPromPlatos from "../template/HeaderPromPlatos";
import Main4 from './Main4';
import PromedioPreparacionPlatos from './reports/PromedioPreparacionPlatos'

class PromPlatos extends Component{


    render(){
        return(

            <React.Fragment>
                <Main4 />
                <HeaderPromPlatos />
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <PromedioPreparacionPlatos />
                </div>
            </React.Fragment>
               
        );
    }

}


export default PromPlatos;