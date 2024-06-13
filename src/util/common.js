import lodashUtil from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const utils = {
    clone: (target) =>  lodashUtil.cloneDeep(target),
    
    isEmpty: (target) => lodashUtil.isEmpty(target),

    isNotEmpty: (target) => !lodashUtil.isEmpty(target),    

    createUUID: () => uuidv4(),
}

export default {};
export {utils}