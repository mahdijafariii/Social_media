const hasAccessToPage = require('../../utils/hasAccessToPage')
const getPage = async (req,res,next) =>{
    try {
        const {pageId} = req.params;
        const user = req.user;
        const hasAccess = await hasAccessToPage(user._id,pageId);
        if(!hasAccess){
            req.flash('error', "Please follow to see content !!");
            return res.render('page/index');
        }
        return res.render('page/index');
    }
    catch (error){
        next(error);
    }
}
module.exports = {getPage}