import { GetCommand} from "@aws-sdk/lib-dynamodb";
import { createDynamoDbClient } from "../../utils/DynamoDBFactory";
import { ISessionItem } from "../../models/ISessionItem";


export async function getSessionById(sessionId: string, tableName: string): Promise<ISessionItem | undefined> {
	const dynamoDB = createDynamoDbClient();

	const getSessionCommand = new GetCommand({
		TableName: tableName,
		Key: {
			sessionId,
		},
	});

	let session;
	try {
		session = await dynamoDB.send(getSessionCommand);
	} catch (e: any) {
		console.error({ message: "getSessionById - failed executing get from dynamodb:", e });
	}

	return session.Item as ISessionItem;
}

