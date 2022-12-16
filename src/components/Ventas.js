import React, {Component} from "react";
import HeaderVdiarias from "../template/HeaderVdiarias";
import Main4 from './Main4';
import VentasAnuales from './reports/VentasAnuales'
import VentasMensuales from './reports/VentasMensuales'

class Ventas extends Component{

    render(){
        return(
           <React.Fragment>
                <Main4 />
                <HeaderVdiarias />
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <VentasAnuales />
                    <hr />
                    <VentasMensuales/>
                </div>
            </React.Fragment>
        );
    }
}


export default Ventas;