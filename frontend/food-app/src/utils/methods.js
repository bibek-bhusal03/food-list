export const getLoggedInUser = () => {
    let user_id = localStorage.getItem("UserID");
    let nutritionist_id = localStorage.getItem("NutritionistID");
    // 
    return {
        _id: user_id || nutritionist_id,
        is_nutritionist: nutritionist_id ? true:false
    };
}