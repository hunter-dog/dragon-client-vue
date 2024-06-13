import moment from 'moment';

moment.locale('ko');

const momentUtil = {
    getFromNow: (strDate) => moment(strDate).fromNow(),
    getDate: (strDate) => moment(strDate).format('YYYY-MM-DD'),
}

export {momentUtil};