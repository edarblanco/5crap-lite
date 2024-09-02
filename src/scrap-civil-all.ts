import { cause } from "./causes";
import { CivilCauseActive, MongoDatabase } from "./db";
import { envs } from "./plugins";

(async () => {
  try {
    console.log("Capture all civil cause initialized...");

    await MongoDatabase.connect({
      url: envs.MONGO_URI,
      dbName: envs.MONGO_DB_NAME,
    });

    const collect = await cause.getCivilCauses();
    await CivilCauseActive.insertMany(collect);

    console.log("Process finish");
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();