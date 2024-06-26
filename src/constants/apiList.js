const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';
const PATCH = 'PATCH';

const API_LIST = {
    TEST: {
        method: 'GET',
        path: `/test`,
        desc: '테스트 api'
    },
    SUBMIT_YONGSAY: {
        method: POST,
        path: `/yongsay/submit`,
        desc: '용세이 작성'
    },
    GET_CATEGORIES: {
        method: GET,
        path: `/yongsay/categories`,
        desc: '카테고리 조회'
    },
    GET_RANDOM_YONGSAY: {
        method: GET,
        path: `/yongsay/random`,
        desc: '랜덤 용세이 조회'
    },
    GET_YONGNIVERSE: {
        method: GET,
        path: `/yongniverse`,
        desc: '용니버스 조회'
    },
    GET_YONGNIVERSE_TEAM_DRAGON: {
        method: GET,
        path: `/yongniverse/team/dragon`,
        desc: '용니버스 드래곤연합 조회'
    },
    GET_RANDOM_YONGSAYS: {
        method: GET,
        path: `/yongsay/contest/random`,
        desc: '용세이 월드컵 무작위 데이터 조회'
    },
    GET_EXAM_LIST: {
        method: GET,
        path: `/yongeic/list`,
        desc: '용익 시험문제 리스트 조회'
    },
    SAVE_EXAM: {
        method: POST,
        path: `/yongeic/save`,
        desc: '용익 시험 문제지 저장'
    },    
    LOAD_EXAM: (id) => ({
        method: GET,
        path: `/yongeic/load/${id}`,
        desc: '용익 시험문제 조회'
    }),
    SUBMIT_EXAM: {
        method: POST,
        path: `/yongeic/submit`,
        desc: '용익 시험 제출'
    },
    ADD_YONGNIVERSE_LIKES: {
       method: POST,
       path: `/yongniverse/add/likes`,
       desc: '용니버스 좋아요 업데이트'
    },
    ADD_YONGNIVERSE_DISLIKES: {
        method: POST,
        path: `/yongniverse/add/dislikes`,
        desc: '용니버스 싫어요 업데이트'
    },
    ADD_GUESTBOOK_LIKES: {
        method: POST,
        path: `/board/guest/book/add/likes`,
        desc: '냥개방명록 좋아요 업데이트'
     },
     ADD_GUESTBOOK_DISLIKES: {
         method: POST,
         path: `/board/guest/book/add/dislikes`,
         desc: '냥개방명록 싫어요 업데이트'
     },
    GET_TOTAL_COUNT_OF_YONGSAYS: {
        method: GET,
        path: `/yongsay/count`,
        desc: '토탈 용세이 카운트 조회'
    },
    GET_TOTAL_GUEST_BOOK: {
        method: GET,
        path: `/board/guest/book`,
        desc: '전체 방명록 조회'
    },
    GET_GUEST_BOOK_CHILD_COMMENT: (id) => ({
        method: GET,
        path: `/board/guest/book/${id}/comment`,
        desc: '방명록 댓글 조회'
    }),
    WRITE_GUEST_BOOK_COMMENT: {
        method: POST,
        path: `/board/guest/book/write/comment`,
        desc: '방명록 댓글 작성'
    },
    INCREASE_WINNING_COUNT_OF_YONGSAY_CONTEST: (id) => ({
        method: PATCH,
        path: `/yongsay/contest/winner/increment/${id}`,
        desc: '용세이 월드컵 우승자 카운트 증가'
    }),
    GET_YONGEIC_STATISTIC: (id) => ({
        method: GET,
        path: `/yongeic/question/${id}/statistic`,
        desc: '용익 문항 통계정보 조회'
    }),

};

const OPEN_API_LIST = {
    DOGS: {
        method: GET,
        path: `https://dog.ceo/api/breeds/image/random`,
        desc: '랜덤 강아지 사진 조회'
    }
}

export {API_LIST, OPEN_API_LIST};
