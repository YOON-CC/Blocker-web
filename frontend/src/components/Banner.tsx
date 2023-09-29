'use client'
import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Link from "next/link";


const Banner = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const bannerImageUrls = [
        '../image/banner2.png',
        '../image/banner1.png',
        '../image/banner3.png',
    ];
    
    
    const changeBannerImage = (nextIndex: number) => {
        if (nextIndex < 0) {
            setCurrentBannerIndex(bannerImageUrls.length - 1);
        } else if (nextIndex >= bannerImageUrls.length) {
            setCurrentBannerIndex(0);
        } else {
            setCurrentBannerIndex(nextIndex);
        }
    };
    
    return (
        <Container_main style={{ backgroundImage: `url(${bannerImageUrls[currentBannerIndex]})`}}>
            <Container_main_btn>
                <Link href="/postwrite"  style={{ textDecoration: 'none' }}>
                    <Container_main_btn_1>게시글 작성하기</Container_main_btn_1>
                </Link>
                <Link href="/contracts"  style={{ textDecoration: 'none' }}>
                    <Container_main_btn_2>진행상황 보러가기</Container_main_btn_2>
                </Link>
            </Container_main_btn>
            <BannerButtons>
                {bannerImageUrls.map((_, index) => (
                    <BannerButton
                        key={index}
                        onClick={() => changeBannerImage(index)}
                        isActive={index === currentBannerIndex}
                    />
                ))}
            </BannerButtons>
        </Container_main>
    );
};

const Container_main = styled.div`
    position : absolute;
    background-image: url(../image/board_img.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position : relative;
    height: 350px;
    width: 1260px;
    top : 50%;
    left : 50%;
    transform : translate(-50%, 40%);
    border-radius : 10px;
    // margin-top:100px;
`;

const Container_main_btn = styled.div`
    position : absolute;
    // background : green;
    height: 105px;
    width: 200px;
    color : #252525;

    border-radius : 0px 10px 10px 0px;

    top : 20%;
    left : 65%;
    transform : translate(50%, 50%);
`;
const Container_main_btn_1 = styled.div`
    background : grey;
    height: 50px;
    width: 100%;
    color : #ffffff;

    display:flex;
    align-items : center;
    justify-content : center;
    margin-right:10px;

    font-weight:bold;
    cursor : pointer;

    border-radius : 5px;
`;
const Container_main_btn_2 = styled.div`
    background : grey;
    height: 50px;
    width: 100%;
    color : #ffffff;

    display:flex;
    align-items : center;
    justify-content : center;

    border-radius : 7px;

    font-weight:bold;
    cursor : pointer;

    border-radius : 5px;

    margin-top : 5px;
`;
const BannerButtons = styled.div`
    position : absolute;

    display: flex;
    justify-content: center;
    top : 100%;
    left : 43%;
    transform : translate(50%, 50%);
`;

const BannerButton = styled.div<{ isActive: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => (props.isActive ? '#aeaeae' : '#e4e4e4')};
    margin: 0 5px;
    cursor: pointer;
`;

export default Banner;