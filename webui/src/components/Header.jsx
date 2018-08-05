import React from 'react';

class Header extends React.Component {

    componentDidMount() {
    }
    
    render() {

        function SvgLogo (props) {
            return (
                <svg
                    width={props.width ? props.width : "113px"}
                    height={props.height ? props.height : "29px"}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <g
                    id="Logo-svg"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    fillOpacity="0.465692935"
                    fontFamily="Lobster-Regular, Lobster"
                    fontSize="38"
                    fontWeight="normal">
                        <g
                        id="Logo"
                        //transform="translate(-7.000000, -10.000000)"
                        fill="#23A480">
                            <text
                            id="airmad">
                                <tspan
                                x="0"
                                y="100"
                                >
                                airmad
                                </tspan>
                            </text>
                        </g>
                    </g>
                </svg>
            );
        }

        return (
        <div className='header'>
            <SvgLogo width="400px" height="150px"/>
        </div>
    );
    }
    
}
export default Header;