import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PostModal from "./PostModal";
import {useState, useEffect} from "react";
import {getArticleAPI} from "../actions"
import ReactPlayer from 'react-player';

function Main(props) {
    const [showModal, setShowModal] = useState("close");

    useEffect(() =>{
        props.getArticles();
    }, []);

    const handleClick = (e) =>{
        if (e.target !== e.currentTarget){
            e.preventDefault();
            return;
        }

        switch (showModal){
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;    
        }
    }
    return (
        <>
                <div className='main'>
                <Container>
                    <ShareBox>
                        
                        <div>
                            {props.user && props.user.photoURL?(<img src={props.user.photoURL} alt=""/>):(<img src="./images/user.svg" alt=""/>)}
                            <button onClick={handleClick} disabled={props.loading? true : false}>Start a post</button>
                        </div>
                        <div>
                            <button>
                                <img src="./images/photo-icon.png" alt=""/>
                                <span>Photo</span>
                            </button>
                            <button>
                                <img src="./images/video-icon.png" alt=""/>
                                <span>Video</span>
                            </button>
                            <button>
                                <img src="./images/event-icon.png" alt=""/>
                                <span>Event</span>
                            </button>
                            <button>
                                <img src="./images/article-icon.png" alt=""/>
                                <span>Article</span>
                            </button>
                        </div>
                    </ShareBox>
                    {props.articles.length === 0 ? (
                        <p>There are no articles to show!!🤥🤥
                            Please click on start a post to add an article!!🚀🚀
                        </p>
                        ) : (
                        <Content>
                            {
                                props.loading && <img src="./images/spin-loader.svg" alt=""/>
                            }
                            {
                                props.articles.length > 0 && props.articles.map((article, key)=>(
                            <Article key={key}>
                                <SharedActor>
                                    <a>
                                        <img src = {article.actor.image}/>
                                        <div>
                                            <span>{article.actor.title}</span>
                                            <span>{article.actor.description}</span>
                                            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                        </div>
                                        <button>
                                            <img src="./images/elipsis-icon.png" alt=""/>
                                        </button>
                                    </a>    
                                </SharedActor>
                                <Description>{article.description}</Description>
                                <SharedImg>
                                    <a>
                                        {
                                            !article.sharedImg && article.video ? <ReactPlayer width={'100%'} url={article.video}/>:
                                            (article.sharedImg && <img src={article.sharedImg} alt=""/>)
                                        }
                                    </a>
                                </SharedImg>
                                <SocialCounts>
                                    <li>
                                        <button>
                                            <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                                            <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt=""/>
                                            <span>75</span>
                                        </button>
                                    </li>
                                    <li>
                                        <a>{article.comments} comments</a>
                                    </li>
                                </SocialCounts>
                                <SocialActions>
                                    <button>
                                        <img src="./images/like-icon.png" alt=""/>
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img src="./images/comment-icon.jpeg" alt=""/>
                                        <span>Comment</span>
                                    </button>
                                    <button>
                                        <img src="./images/share-icon.jpeg" alt=""/>
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img src="./images/send-icon.png" alt=""/>
                                        <span>Send</span>
                                    </button>
                                </SocialActions>
                            </Article>
                        ))}
                        </Content>)}
                    <PostModal showModal={showModal} handleClick={handleClick}/>
                </Container>
            </div>
        </>
    )
}

const Container = styled.div`
    grid-area: main;
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #95ab7b;
    margin: 0 0 8px;
    background: white;
    height: 150px;
    div{
        button{
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            margin-top: 10px;
            img{
                width: 50px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                text-align: left;
            }
        }
        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
            margin-top: 15px;
            button{
                img{
                    margin: 0 4px 0 -2px;
                    max-width: 38px;
                }
                span{
                    color: #70b5f9; 

                }
            }
        }
    }
`;

const Content = styled.div`
    text-align: center;
    & > img{
        width: 30px;
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a{
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        img{
            width: 40px;
            height: 40px;
        }
        &>div{
            display:flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                }
                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6)
                }
            }
        }
    }
    button{
        position: absolute;
        right: 12px;
        top:0;
        background: transparent;
        border: none;
        outline: none;
        
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImg = styled.div`
    margin-top: 8px;
    width:100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img{
        object-fit: contain;
        width: 100%;
        height: 100%;

    }
`;

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    list-style: none;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    li{
        margin-right: 5px;
        font-size: 12px;
        button{
            display: flex;
            border:none;
            background-color: white;
        }
    }
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding: 8px;
        background-color: white;
        border: none;
        span{
            margin-left: 2px;
        }
        img{
            max-width: 20px;
            border-radius: 50%;
        }
    }
`;

const mapStateToProps = (state) =>{
    return{
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles,
    };
  };

const mapDispatchToProps = (dispatch) =>({
    getArticles : () => dispatch(getArticleAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
