import styled from 'styled-components';

export const Banner_img = styled.img`
    position  : relative;
    width : 1300px;
    height : 330px;
    margin-top : 100px;
    left : 50%;
    transform : translate(50%);
    margin-left : -1300px;
    border-radius : 5px;

`;
export const Container_title_1 = styled.div`
    // background : red;
    margin-top : 10px;

`
export const Container_title_1_name = styled.div`
    position : relative;
    // background : blue;
    width : 1300px;
    font-size : 20px;
    color : #8f8f8f;
    left : 50%;
    transform : translate(-50%);

    
    margin-top : 15px;
    border-bottom: 2px solid #e3e3e3;
`

export const Container_2 = styled.div`
    // position : absolute;
    // background : blue;
    height: 280px;
    width: 100%;
    margin-top : 15px;
`;

export const Container_2_contract = styled.div`
    position : absolute;
    // background : green;
    height: 280px;
    width: 1300px;


    left : 50%;
    transform : translate(-50%);

    display : flex;
    justify-content : space-between;
`;
export const Container_2_contract_1 = styled.div`
    background : white;
    height: 100%;
    width: 400px;
    border-radius : 3px;
    box-shadow: 1px 1px 6px 2px rgb(196, 196, 196);
`;
export const Container_2_contract_2 = styled.div`
    background : white;
    height: 100%;
    width: 400px;
    border-radius : 3px;
    box-shadow: 1px 1px 6px 2px rgb(196, 196, 196);
`;
export const Container_2_contract_3 = styled.div`
    background : white;
    height: 100%;
    width: 400px;
    border-radius : 3px;
    box-shadow: 1px 1px 6px 2px rgb(196, 196, 196);
`;
export const Container_2_contract_title_Container = styled.div`
    // background : green;
    height: 50px;
    width: 100%;
    display : flex;
`;
export const Container_2_contract_title_Container_content = styled.div`
    // background : red;
    height: 100%;
    width: 200px;
    margin-left : 60px;
`;
export const Container_2_contract_title_Container_content_1 = styled.div`
    // background : aqua;
    height: fit-content;
    width: 100%;
    margin-top : 10px;

    font-size : 20px;
    font-weight : bold;
    display : flex;
    justify-content : center;
    align-items: center;
`;
export const Container_2_contract_line = styled.div`
    background : #d1d1d1;
    height: 2px;
    width: 380px;
    margin-left : 10px;
`;
export const Container_2_contarcts_container = styled.div`
    position : absolute;
    // background : green;
    height: 220px;
    width: 380px;
    margin-left : 10px;
    overflow : auto;

    /* 스크롤바 스타일링 */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }


`;
export const Container_2_contarcts_1 = styled.div`
    position : relative;
    background : #efefef;
    height: 100px;
    width: 100%;
    margin-top : 10px;
    cursor : pointer;

    &:hover {
        filter: brightness(90%); 
    }
    color : black;

`;
export const Container_2_contarcts_1_title = styled.div`
    
    // background : blue;
    height: 40px;
    width: 100%;
    margin-top : 7px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-weight : bold;
    font-size : 20px;
`;
export const Container_2_contarcts_1_content = styled.div`
    // background : yellow;
    height: 30px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : #a9a9a9;
`;
export const Container_2_contarcts_1_info = styled.div`
    // background : yellow;
    height: 30px;
    width: 100%;
    display : flex;
    justify-content : center;

`;
export const Container_2_contarcts_1_info_content_id = styled.div`
    // background : blue;
    height: 100%;
    width: 80px;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 12px;
`;
export const Container_2_contarcts_1_info_content = styled.div`
    // background : blue;
    height: 100%;
    width: 170px;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 12px;
`;
export const Container_3_contract_write = styled.div`
    position : absolute;
    // background : yellow;
    left : 50%;
    transform : translate(-50%);
    height: 40px;
    width: 340px;
    margin-top : -70px;
    display : flex;
    justify-content : center;
    z-index : 0;
`;
export const Container_3_contract_write_btn = styled.div`
    position : relative;
    background : #ffffff;
    height: 100%;
    width: 160px;

    border:none;
    cursor : pointer;

    font-size : 15px;
    font-weight: bold;
    color : #435DF1;

    left : 50%;
    transform : translate(-50%);

    border-radius : 4px;

    display : flex;
    justify-content : center;
    align-items : center;
`;

export const Container_title_2 = styled.div`
    // background : red;
    margin-top : 30px;

`
export const Container_title_2_name = styled.div`
    position : relative;
    // background : blue;
    width : 1300px;
    font-size : 20px;
    color : #8f8f8f;
    left : 50%;
    transform : translate(-50%);

    border-bottom: 2px solid #e3e3e3;
`
export const Container_3 = styled.div`
    // position : absolute;
    // background : blue;
    height: 280px;
    width: 100%;
    margin-top : 15px;
`;
export const Container_3_contract = styled.div`
    position : absolute;
    // background : green;
    height: 280px;
    width: 850px;


    left : 50%;
    transform : translate(-76.5%);

    display : flex;
    justify-content : space-between;
`;
export const Container_3_contract_1 = styled.div`
    background : white;
    height: 100%;
    width: 400px;
    border-radius : 3px;
    box-shadow: 1px 1px 6px 2px rgb(196, 196, 196);
`;
export const Container_3_contract_2 = styled.div`
    background : white;
    height: 100%;
    width: 400px;
    border-radius : 3px;
    box-shadow: 1px 1px 6px 2px rgb(196, 196, 196);
`;
export const Footer = styled.div`
    // background : red;
    height : 20px;
    width : 100%
`