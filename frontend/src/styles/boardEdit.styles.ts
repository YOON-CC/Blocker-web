import styled from 'styled-components';


export const Container = styled.div`
    // background : #e8edf1;
    position : absolute;
    height: 500px;
    width: 600px;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;
export const Container_tip = styled.div`
    background : #435DF1;
    height: 40px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : white;
    border-radius : 4px;
`;
export const Container_title = styled.input`
    height: 40px;
    width: 585px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding-left : 10px;
    margin-top : 10px;

    border-radius : 4px;
`;
export const Container_default_img = styled.div`
    height: 55px;
    width: 587px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding-left : 10px;
    margin-top : 10px;
    padding-top : 4px;

    border-radius : 4px;
`;
export const Container_img_select = styled.div`
    height: 100px;
    width: 596px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    border-radius: 4px;
    border: 2px dotted #e3e3e3;
    overflow-y: hidden; 
    overflow-x: auto; 

    // background : #f0f0f0;
`;
export const Container_img = styled.img`
    position: relative;
    width: fit-content;
    height: 50px;
    margin-right: 30px;
    cursor: pointer;
    transition: filter 0.3s; /* 효과 전환 시간 설정 */

    &:hover {
        filter: brightness(0.3); /* 호버 시 필터 적용 */
    }
`;
export const StyledLabel = styled.label`
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom: 5px;
    background-color: #e3e3e3;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;

    font-size : 20px;
    

`;
export const Container_img_select_btn = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
`;
export const Container_info_container = styled.div`
    background: linear-gradient(to right, #a3a3a3, #c9c9c9);
    height:40px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 10px;

    display : flex;
    justify-content : space-between;

    border-radius : 3px;

`;
export const Container_info_container_select_location = styled.div`
    height:100%;
    width: 300px;

    display : flex;
    justify-content:center;
    align-items: center;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
        cursor : pointer;
    }
`;
export const Container_info_container_select_contract = styled.div`
    height:100%;
    width: 300px;

    display : flex;
    justify-content:center;
    align-items: center;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
        cursor : pointer;
    }
`;
export const Container_content = styled.textarea`
    height: 150px;
    width: 577px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding : 10px;
    margin-top : 10px;

    font-family: 'Varela Round', sans-serif;

    resize : none;

    border-radius : 4px;
`;
export const Container_btn_container = styled.div`
    // background : red;
    height:40px;
    width: 160px;

    display : flex;
    justify-content : space-between;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 10px;
    margin-left : 440px;

`;
export const Container_btn_container_b1 = styled.div`
    background : #CFCFCF;
    height:100%;
    width: 75px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    border-radius : 4px;
    
    cursor:pointer;
`;
export const Container_btn_container_b2 = styled.button`
    background : #435DF1;
    height:100%;
    width: 75px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    border-radius : 4px;
    border : none;

    cursor:pointer;
`;
