import { Server, Socket } from "socket.io";
import { Message } from "../models"


export const registerChatSocket = (io: Server, socket: Socket) => {
  
    socket.on("chatMessage", async ({ senderId, roomId, content, timestamp }) => {
      try {
        const message = await Message.create({
          senderId,
          roomId,
          content,
          timestamp
        });

        io.to(roomId).emit("chatMessage",message)
      } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          socket.emit("error", { message: errorMessage });
    }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

}
