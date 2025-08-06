module.exports=function(api){
    api.cache(true);
    return{
        presets:['babel-presets-expo'],
        Plugins:['react-natve-reanimated/plugin'],
    };
}; 