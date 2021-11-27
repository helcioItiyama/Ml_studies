import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const textDetection = functions.https.onCall(async (data) => {
  try {
    const [result] = await client.textDetection(data);
    return result.textAnnotations;
  } catch (e) {
    throw new functions.https.HttpsError("internal", e?.message, e?.details);
  }
});

export const labelDetection = functions.https.onCall(async (data) => {
  try {
    const [result] = await client.labelDetection(data);
    return result.labelAnnotations;
  } catch (e) {
    throw new functions.https.HttpsError("internal", e?.message, e?.details);
  }
});
