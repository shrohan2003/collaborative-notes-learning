<template>
  <v-app>
    <v-main class="login-page">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="8" rounded="lg">
              <v-card-title class="text-h4 font-weight-bold">
                Welcome back
              </v-card-title>

              <v-card-subtitle class="mt-2">
                Log in to continue to Collaborative Notes.
              </v-card-subtitle>

              <v-card-text class="pt-6">
                <v-form>
                  <v-text-field
                    label="Email address"
                    type="email"
                    variant="outlined"
                  />

                  <v-text-field
                    label="Password"
                    type="password"
                    variant="outlined"
                  />

                  <v-btn block color="primary" size="large" type="button">
                    Log in
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-center">
                <span>New here?</span>
                <v-btn color="primary" variant="text">
                  Create account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>