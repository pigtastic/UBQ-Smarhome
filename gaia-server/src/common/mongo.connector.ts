import * as mongo from 'mongodb';

export class MongoConnector {
  static client: mongo.MongoClient;

  public static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client: mongo.MongoClient) => {
          if (err) {
            reject(err);
          } else {
            MongoConnector.client = client;
            resolve(client);
          }
        });
    });
  }

  public disconnect(): void {
    MongoConnector.client.close();
  }

  public static async chooseGaiaDB(collection: string) {
    const db = await MongoConnector.client.db('gaiadb');
    return db.collection(collection);
  }
}
