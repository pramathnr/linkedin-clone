import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import firebase from "firebase";
import {postArticleAPI} from "../actions";

function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) =>{
    const image = e.target.files[0];
    if(image === "" || image === undefined){
      alert('not an image, the file is a ${typeof image}');
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) =>{
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) =>{
    e.preventDefault();
    if (e.target !== e.currentTarget){
      return;
    }
    const payload ={
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
      e.preventDefault();
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };
  return (
    <>
      { props.showModal === "open" &&
        <div className="postmodal">
          <Container>
            <Content>
              <Header>
                <h2>Create a Post</h2>
                <button onClick={(e) => reset(e)}>
                  <img src="./images/close-icon.png" alt="" />
                </button>
              </Header>
              <SharedContent>
                <UserInfo>
                  {props.user && props.user.photoURL?(<img src={props.user.photoURL} alt=""/>):(<img src="./images/user.svg" alt=""/>)}
                  <span>{props.user? props.user.displayName : "Name"}</span>
                </UserInfo>
                <Editor>
                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    placeholder="What's up in your mind 💭💭"
                    autoFocus={true}
                  />
                  { assetArea==="image" ?(
                    <UploadImage>
                      <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="file" style={{display:"none"}} onChange={handleChange}/>
                      <p>
                        <label htmlFor="file" style={{border: "1px solid black"}, {backgroundColor:"lightgoldenrodyellow"}}>Click here to select an image to share</label>
                      </p>
                      {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                    </UploadImage>) 
                    : assetArea==="media" && (
                      <>
                        <input 
                          type="text"
                          placeholder="Please input a video link"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                        {videoLink && (<ReactPlayer width={"100%"} url={videoLink}/>)}
                      </>)
                  }
                </Editor>
              </SharedContent>
              <ShareCreation>
                <AttachAssets>
                  <AssetButton onClick={() => switchAssetArea("image")}>
                    <img src="./images/photo-icon.png" alt="" />
                  </AssetButton>
                  <AssetButton onClick={() => switchAssetArea("media")}>
                    <img src="./images/video-icon.png" alt="" />
                  </AssetButton>
                </AttachAssets>
                <ShareComment>
                  <AssetButton>
                    <img src="./images/comment-icon.jpeg" alt="" />
                    Anyone
                  </AssetButton>
                </ShareComment>
                <PostButton disabled={!editorText ? true : false} onClick={(e)=>postArticle(e)}>Post</PostButton>
              </ShareCreation>
            </Content>
          </Container>
        </div>
      }
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 40px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 35px;
    width: 35px;
    background-color: white;
    border: none;
    img {
      width: 20px;
      height: 20px;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
  border: none;
  img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.2)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "black" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    border: none;
    min-height: 100px;
    resize: none;
    text-decoration: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img{
    width: 100%;
  }
`;

const mapStateToProps = (state) =>{
    return{
        user: state.userState.user,
    };
  };

const mapDispatchToProps = (dispatch) =>({
  postArticle : (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
