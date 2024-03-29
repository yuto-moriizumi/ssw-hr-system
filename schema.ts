/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/users/{userId}": {
    /** Retrieve the information of the user with the matching user ID. */
    get: operations["get-users-userId"];
    /** Update the information of an existing user. */
    patch: operations["patch-users-userId"];
    parameters: {
      path: {
        /** Id of an existing user. */
        userId: number;
      };
    };
  };
  "/users": {
    get: operations["get-users"];
    /** Create a new user. */
    post: operations["post-user"];
    parameters: {};
  };
}

export interface components {
  schemas: {
    /** User */
    User: {
      /** @description Unique identifier for the given user. */
      id?: string;
      name?: string;
      /** Format: date */
      joined_at?: string;
      /** Format: date */
      left_at?: string;
      comment?: string;
      departments?: number[];
    };
  };
}

export interface operations {
  /** Retrieve the information of the user with the matching user ID. */
  "get-users-userId": {
    parameters: {
      path: {
        /** Id of an existing user. */
        userId: number;
      };
    };
    responses: {
      /** User Found */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** User Not Found */
      404: unknown;
    };
  };
  /** Update the information of an existing user. */
  "patch-users-userId": {
    parameters: {
      path: {
        /** Id of an existing user. */
        userId: number;
      };
    };
    responses: {
      /** User Updated */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** User Not Found */
      404: unknown;
      /** Email Already Taken */
      409: unknown;
    };
    /** Patch user properties to update. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
  };
  "get-users": {
    parameters: {};
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"][];
        };
      };
    };
  };
  /** Create a new user. */
  "post-user": {
    parameters: {};
    responses: {
      /** User Created */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** Missing Required Information */
      400: unknown;
      /** Email Already Taken */
      409: unknown;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
  };
}

export interface external {}
