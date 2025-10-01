import { describe, it, beforeEach, expect, vi } from "vitest";
import { createMemoryHistory } from "history";
import { HistoryRouterGateway } from "./HistoryRouterGateway.js";
import { RouterRepository } from "./RouterRepository.js";
import { Route } from "./Route.js";

const wait = () => new Promise(resolve => setTimeout(resolve, 10));

const loginRouteDef = new Route({ name: "login", path: "/login" });

const userRouteDef = new Route({
    name: "userById",
    path: "/users/:id",
    params: zod => {
        return {
            id: zod.string()
        };
    }
});

const allRoutes: Route<any>[] = [
    new Route({ name: "home", path: "/" }),
    loginRouteDef,
    userRouteDef
];

const loginRoute = {
    name: "login",
    path: "/login",
    pathname: "/login",
    params: {}
};

const userRoute = (id: string) => {
    return {
        name: "userById",
        path: "/users/:id",
        pathname: `/users/${id}`,
        params: {
            id
        }
    };
};

const createRepository = (routes = allRoutes) => {
    const history = createMemoryHistory();
    history.replace("/__unknown__");

    const gateway = new HistoryRouterGateway(history, "");
    const repository = new RouterRepository(gateway);

    repository.registerRoutes(routes);

    return { repository, history };
};

describe("Router Repository", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("state should contain current route", async () => {
        const { repository, history } = createRepository();
        history.push("/login");
        await wait();

        expect(repository.getMatchedRoute()).toEqual(loginRoute);
    });

    it("route guard should allow or prevent route transition", async () => {
        const { repository, history } = createRepository();
        history.push("/login");
        await wait();

        // This guard should prevent the transition.
        // The Repository should stay where it was, and the `history` should restore the previous URL.
        repository.onRouteExit(({ cancel }) => {
            cancel();
        });

        // Trigger a history location change (imagine a click on "Back" button in the browser).
        history.push("/users/123");
        await wait();

        expect(repository.getMatchedRoute()).toEqual(loginRoute);

        // This guard should allow the transition.
        repository.onRouteExit(guard => {
            guard.continue();
        });

        // Trigger a history location change (imagine a click on "Back" button in the browser).
        history.push("/users/123");
        await wait();

        expect(repository.getMatchedRoute()).toEqual(userRoute("123"));
    });

    it("route guard should be unset after route transition", async () => {
        const guardSpy = vi.fn();
        const { repository, history } = createRepository();
        history.push("/login");
        await wait();

        // This guard should prevent the transition.
        // The Repository should stay where it was, and the `history` should restore the previous URL.
        repository.onRouteExit(guard => {
            guardSpy();
            guard.continue();
        });

        // Trigger a history location change (imagine a click on "Back" button in the browser).
        history.push("/users/123");
        await wait();

        expect(repository.getMatchedRoute()).toEqual(userRoute("123"));
        expect(guardSpy).toHaveBeenCalledTimes(1);
        vi.resetAllMocks();

        // Trigger a history location change (imagine a click on "Back" button in the browser).
        history.push("/login");
        await wait();

        expect(repository.getMatchedRoute()).toEqual(loginRoute);
        expect(guardSpy).toHaveBeenCalledTimes(0);
    });

    it("should go to the right route", async () => {
        const { repository } = createRepository();
        repository.goToRoute(userRouteDef, { id: "5" });
        await wait();
        expect(repository.getMatchedRoute()).toEqual(userRoute("5"));
    });

    it("should generate a valid route link", async () => {
        const { repository } = createRepository();

        expect(repository.getLink(loginRouteDef)).toEqual("/login");
        expect(repository.getLink(userRouteDef, { id: "1" })).toEqual("/users/1");
    });

    it("should generate a valid route link when no routes are registered", async () => {
        const { repository } = createRepository([]);

        expect(repository.getLink(loginRouteDef)).toEqual("/login");
        expect(repository.getLink(userRouteDef, { id: "1" })).toEqual("/users/1");
    });
});
