import messageService from "../services/message.service";

describe("", () => {
    let marsToken: string, earthToken: string

    beforeEach(() => {
        messageService.startClientPC();
        marsToken = messageService.startMarsServer();
        earthToken = messageService.startEarthServer();
        messageService.startSatelite();
    });

    afterEach(() => {
        messageService.stopClientPC();
        messageService.stopMarsServer();
        messageService.stopEarthServer();
        messageService.stopSatelite();
    });

    context("Message to Earth", () => {
        it("Should get 'Success' response message", () => {
            const response = messageService.sendMessage("Message to Earth", "Earth", earthToken);
            messageService.assertResponse(response, "Success");
        });

        it("Should get 'Security error' response message with invalid token", () => {
            const response = messageService.sendMessage("Message to Earth", "Earth", earthToken+1);
            messageService.assertResponse(response, "Security Error");
        });

        it("Should get 'Broken: Client is offline!' response message while client pc is offline", () => {
            messageService.stopClientPC();
            try {
                 messageService.sendMessage("Message to Earth", "Earth", earthToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Client is offline!");
            }
        });
        it("Should get 'Broken: Earth Server is offline!' response message while earth server is offline", () => {
            messageService.stopEarthServer();
            try {
                messageService.sendMessage("Message to Earth", "Earth", earthToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Earth Server is offline!");
            }
        });

        it("Should get 'Service is unavailable' response message while satellite is offline", () => {
            messageService.stopSatelite();
            const response = messageService.sendMessage("Message to Earth", "Earth", earthToken);
            messageService.assertResponse(response, "Service is unavailable");
        });
    });
    context("Message to Mars", () => {
        it("Should get 'Success' response message", () => {
            const response = messageService.sendMessage("Message to Mars", "Mars", marsToken);
            messageService.assertResponse(response, "Success");
        });

        it("Should get 'Security error' response message with invalid token", () => {
            const response = messageService.sendMessage("Message to Mars", "Mars", marsToken+1);
            messageService.assertResponse(response, "Security Error");
        });

        it("Should get 'Broken: Client is offline!' response message while client pc is offline", () => {
            messageService.stopClientPC();
            try {
                messageService.sendMessage("Message to Mars", "Mars", marsToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Client is offline!");
            }
        });
        it("Should get 'Broken: Mars Server is offline!' response message while earth server is offline", () => {
            messageService.stopMarsServer();
            try {
                messageService.sendMessage("Message to Mars", "Mars", marsToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Mars Server is offline!");
            }
        });
        it("Should get 'Service is unavailable' response message while satellite is offline", () => {
            messageService.stopSatelite();
            const response = messageService.sendMessage("Message to Mars", "Mars", marsToken);
            messageService.assertResponse(response, "Service is unavailable");
        });
    });
    context("Check 'Send message' method", () => {
        it("Should get 'Broken: Wrong parameters' response message if message is not set", () => {
            try {
                messageService.sendMessage(null!, "Mars", marsToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Wrong parameters");
            }
        });
        it("Should get 'Broken: Wrong parameters' response message if destination is not set", () => {
            try {
                messageService.sendMessage(null!, "", marsToken);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Wrong parameters");
            }
        });
        it("Should get 'Broken: Wrong parameters' response message if token is not set", () => {
            try {
                messageService.sendMessage(null!, "Mars", null!);
            } catch (error) {
                messageService.assertResponse(error.message, "Broken: Wrong parameters");
            }
        });
    });
});