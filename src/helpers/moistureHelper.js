const MoistureHelper = {
    get_level_values(allMoisture,level) {
        return allMoisture
        .map((moisture) => {
          return moisture[level].value;
        });

    }
}

export default MoistureHelper

//MoistureHelper.get_level_values(allMoisture,0)