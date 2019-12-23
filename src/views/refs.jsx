import React from 'react';

export default class MyRef extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.ref = React.createRef();
        this.anotherRef = React.createRef();
    }
    handleClick () {
        // console.log('refs==', this.ref);
        // this.ref.current.focus();

        console.log('refs==', this.anotherRef);
        // this.ref.current.focus();
        
    }
    render () {
        return (
            <div className="my-refs" style={{padding: '20px'}}>
                {/* <FancyButton ref={ref} onClick={this.handleClick}>Click me!</FancyButton>; */}
               <MyText ref={this.ref} style={{marginTop: '20px', display: 'block'}}/>   
               <AnotherText ref={this.anotherRef} style={{marginTop: '20px', display: 'block'}}/> 
               <button onClick={this.handleClick} style={{marginTop: '20px', display: 'block'}}>点击获取ref</button>
            </div>
        )
    }

}


const MyText = React.forwardRef((props, ref) => (<input ref={ref}></input>))


const AnotherText = React.forwardRef((props, ref) => {
    class WrapperAnotherText extends React.Component {
        constructor (props) {
            super(props)
        }
        render () {
            return (
                <input type="checkbox" ref={this.props.transRef}/>
            )
        }
    }
    return <WrapperAnotherText {...props} transRef={ref}/>
})
