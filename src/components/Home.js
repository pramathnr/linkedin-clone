import React from 'react';
import styled from 'styled-components';
import LeftSide from './LeftSide';
import Main from './Main';
import RightSide from './RightSide';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function Home(props) {
    return (
        <div className='home'>
            <Container>
                {!props.user && <Redirect to ='/'/>}
                <Section>
                    <h5>
                        <a>Hiring in a hurry? - </a>
                    </h5>
                    <p>Find talented pros in record time with upwork and keep buisness moving </p>
                </Section>
                <Layout>
                    <LeftSide/>
                    <Main/>
                    <RightSide/>
                </Layout>
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding-top: 50px;
    max-width: 100%;
`;

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    h5{
        color: #0a66c2;
        a{
            font-weight: 700;
        }
    }
    p{
        font-size: 16px;
        color: #434649;
        font-weight: 500;
    }

`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    grid-auto-rows: auto;
    margin: 25px 0;

`;

const mapStateToProps = (state) =>{
    return{
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(Home)
