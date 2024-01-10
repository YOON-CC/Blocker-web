import styled from 'styled-components';

export const Container = styled.div`
    position : absolute;
    // background : red;
    height: fit-content;
    width: 500px;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;

export const Container_title = styled.input`
    height: 40px;
    width: 485px;

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
export const Container_content = styled.textarea`
    height: 150px;
    width: 477px;

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
    margin-left : 340px;

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
    background : black;
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