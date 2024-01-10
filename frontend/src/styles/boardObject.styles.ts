import styled from 'styled-components';

export const AllContainer = styled.div`
    position : absolute;
    width : 1000px;
    height : 400px;
    background : white;
    padding : 20px;
    top : 48%;
    left : 50%;
    transform : translate(-50%, -50%);
    display : flex;
    justify-content : end;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    // border : 1px solid #000000;
`;
export const Edit_container = styled.div`
    position : absolute;
    // background : red;
    height : 20px;
    width: 1000px;
    display : flex;
    justify-content : end;
    margin-top : -10px

    // border : 1px solid #000000;
`;
export const Edit_container_btn_container = styled.div`
    // position : absolute;
    // background : aqua;
    height : 20px;
    width: 95px;

    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
export const Edit_container_b1 = styled.button`
    background : #e8edf1;
    height : 100%;
    width: 45px;

    font-size : 10px;
    font-weight : bold;
    color : grey;
    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 2px;
    cursor : pointer;
    border : none;
`;
export const Edit_container_b2 = styled.button`
    background : #e8edf1;
    height : 100%;
    width: 45px;

    font-size : 10px;
    font-weight : bold;
    color : grey;
    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 2px;
    cursor : pointer;
    border : none;
`;
export const Container_1 = styled.div`
    position : absolute;
    // background : red;
    height : 330px;
    width: 1000px;
    margin-top : 25px;

    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
export const Container_1_c1 = styled.div`
    // background : red;
    height : 100%;
    width: 530px;
    display: flex;
    justify-content: center;
    align-items: center;

`;
export const Container_1_c2 = styled.div`
    // background : blue;
    height : 100%;
    width: 450px;
`;
export const Container_1_c2_title = styled.div`
    // background : aqua;
    height : fit-content;
    width: 100%;

    display : flex;
    align-items : center;

    font-size : 20px;
    font-weight : bold;

    border-bottom : 2px solid #e8edf1;
    padding-bottom : 10px;
`;
export const Container_1_c2_info = styled.div`
    // background : aqua;
    height : 15px;
    width: 100%;

    display : flex;

    font-size : 20px;
    margin-top:10px;
`;
export const Container_1_c2_info_1 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 14px;
    color : #b6b6b6;
`;
export const Container_1_c2_info_2 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 14px;
    color : #b6b6b6;

    margin-left : 15px;
`;
export const Container_1_c2_info_3 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 12px;
    font-weight : bold;
    color : #b6b6b6;

    margin-left : 15px;
`;
export const Container_1_c2_info_4 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 12px;
    font-weight : bold;
    color : #b6b6b6;

    margin-left : 5px;
`;
export const Container_1_c2_detail = styled.div`
    // background : aqua;
    height : fit-content;
    width: 100%;

    font-size : 20px;
    font-weight : bold;
    margin-top: 12px;
`;
export const Container_1_c2_detail_1 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
`;
export const Container_1_c2_detail_1_text1 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
export const Container_1_c2_detail_2 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
    margin-top : 5px;
`;
export const Container_1_c2_detail_2_text2 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
export const Container_1_c2_detail_3 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
    margin-top : 5px;
`;
export const Container_1_c2_detail_3_text3 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
export const Container_1_c2_btn = styled.div`
    background: linear-gradient(to right, #4324dc, #7197ff);
    height : 45px;
    width : 450px;

    display : flex;
    justify-content : space-between;
    font-size : 13px;
    font-weight : bold;
    color : #b6b6b6;
    margin-top : 15px;
    border-radius : 5px;
`;
export const Container_1_c2_btn_1_false = styled.button`
    // background : #d7d7d7;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;
    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }
`;
export const Container_1_c2_btn_1_true = styled.button`
    // background : #e5ff00;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : #00ff6a;

    border : none;
    outline : none;

    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }

`;
export const Container_1_c2_btn_2 = styled.button`
    // background : #435DF1;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;

    cursor : pointer;
    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }

`;
export const Container_1_c2_btn_3 = styled.button`
    // background : #ff002b;
    background  : none;
    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;

    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }
`;
export const Container_2 = styled.div`
    position : absolute;
    // background : blue;
    height : 50px;
    width : 533px;

    left : 50%;
    transform : translate(-93.7%);

    margin-top : 363px;


    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
export const Container_2_img_container = styled.div`
    position : absolute;
    // background : #e8edf1;
    height : 100%;
    width : 565px;
    display : flex;

    left : 50%;
    transform : translate(-50%);

`;
export const Container_1_c2_content = styled.div`
    background : #f1f1f1;
    height : fit-content;
    width : 440px;
    border-radius : 5px;

    color : grey;
    font-size : 12px;
    font-weight : bold;
    margin-top : 10px;
    padding:5px;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(2.5px); 
`;

export const ModalImage = styled.img`
    max-width: fit-content;
    max-height: 330px;
`;
export const Footor = styled.div`
    position: fixed;
    width : 100%;
    background: linear-gradient(to right, #1938ff, #5f92ff);
    height : 40%;
    bottom: 0;
    left: 0;
    z-index : -1;
`;