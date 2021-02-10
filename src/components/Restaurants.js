import React from 'react';

class Restaurants extends React.Component{
    constructor(props){
        super();
        this.state = {
            rests: props.rests
        }
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    openUrl = (url) => {
        window.open(url);
    }

    copyNumber = (num, ind) => {
        let phoneNumber = document.getElementById(`i-${ind}`);
        phoneNumber.classList.remove('hide');
        phoneNumber.select();
        phoneNumber.setSelectionRange(0, 9999);
        document.execCommand('copy');
        phoneNumber.classList.add('hide');
        const tooltip = document.querySelector(`#c-${ind}`);
        tooltip.setAttribute('data-tooltip', 'Number Copied');
    }

    render(){
        let index = 0;
        return (
        <>
            <div id="div-restaurants-container">
                {this.state.rests.map((rest) => {
                    let pho = index;
                    index += 1;
                    let phone = '';
                    if (rest.phone.length > 0){
                        phone = rest.phone.split('+')[1];
                        let phoneSplit = phone.split('');
                        while (phoneSplit.length > 10){
                            let newphone = [];
                            for (let i = 1; i < phoneSplit.length; i++){
                                newphone.push(phoneSplit[i]);
                            };
                            phone = newphone.join('');
                            phoneSplit = phone.split('');
                        }
                        phone = phone.split('');
                        phone.splice(3, 0, "-");
                        phone.splice(7, 0, "-")
                        phone = phone.join('');
                    }
                    return (
                        <div key={Math.random()} className="div-restaurant">
                            <img alt={`${rest.name}`} className="img-restaurant" src={rest.image_url}/>
                            <div className="div-restaurant-info">
                                <div className="div-info-1">
                                    <h3 onClick={() => this.openUrl(rest.url)} className="h3-restaurant-name">{rest.name}</h3>
                                    <div className="div-restaurant-address">
                                        {rest.location.display_address.map((add) => {
                                            return (
                                                <p key={Math.random()} className="p-restaurant-address">{add}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="div-info-2">
                                    <div className="div-phone-container">
                                        <img className="img-phone" src="https://bernardmurphy.net/assets/phoneicontrans.png" alt="phone"/>
                                        <p className="p-phone">{phone}</p>
                                        <button id={`c-${pho}`} data-tooltip="Copy to Clipboard" className="button-copy" onClick={() => this.copyNumber(phone, pho)}>Copy number</button>
                                        <input readOnly type="text" className="hide" value={phone} id={`i-${pho}`}/>
                                    </div>
                                    <div className="div-rating-container">
                                        <div className="div-rating-top">
                                            <p className="p-rating-word">Rating:</p>
                                            <img alt={`${rest.rating} stars`} className="img-rating" src={`https://bernardmurphy.net/assets/yelp_stars/use/${rest.rating}.png`}/>
                                        </div>
                                        <div className="div-rating-bottom">
                                            <p className="p-rating-number">{`(${rest.review_count} reviews)`}</p>
                                            <img onClick={() => this.openUrl(rest.url)} alt="Yelp" className="img-yelp" src="https://bernardmurphy.net/assets/yelp-logo.png"/>
                                        </div>
                                    </div>
                                    {(rest.price !== undefined) ?
                                        <div className="div-price-container">
                                            <p className="p-price-word">Price:</p>
                                            <p className="p-price-signs">{rest.price.split('').map((sign) => {return '$'})}</p>
                                        </div> : 
                                        <></>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })} 
            </div>
        </>
        )
    }
}

export default Restaurants;