const AccountResolver = {
  Query: {
    account: async (_, { _id }, { dataSources: { accountAPI } }) => {
      const data = await accountAPI.getAccount(_id);
      //   try {
      //     if (context.account._id.toString() !== accountId)
      //       throw new ApolloError("Invalid Context");
      //     const getAccount = await AccountController.getAccountByAccountId(
      //       accountId
      //     );
      //     if (!getAccount) throw new AuthenticationError("Invalid AccountId");
      //     const Account = getAccount.toJSON();
      //     return {
      //       payload: Account,
      //       token: "",
      //       message: "Account Detail",
      //       status: 200,
      //     };
      //   } catch (error) {
      //     logger.error(error);
      //     throw new ApolloError(error.message, error.extensions.code);
      //   }
      console.log({ data });
      return data;
    },
  },
  Mutation: {
    accountCreate: async (
      _,
      { email, password },
      { dataSources: { accountAPI } }
    ) => {
      const data = await accountAPI.createAccount(email, password);
      //   try {
      //     if (name.length < 3) {
      //       throw new ApolloError("name is Too short");
      //     }
      //     if (email.length < 6) {
      //       throw new ApolloError("email is Too short");
      //     }
      //     if (password.length < 6) {
      //       throw new ApolloError("Password should be of at least 6 digit");
      //     }

      //     const emailValidate = validateEmail(email);
      //     if (!emailValidate) throw new ApolloError("invalid email");

      //     const isAccount = await AccountController.checkAccountByEmail(email);
      //     if (isAccount) {
      //       throw new ApolloError("User already Exists");
      //     }
      //     const emailToken = crypto.randomBytes(16).toString("hex");
      //     const salt = bcrypt.genSaltSync(10);
      //     const hash = bcrypt.hashSync(password, salt);
      //     const startDate = new Date();
      //     const paymentStatus = {
      //       plan: "FREE",
      //       amount: 0,
      //       planType: "FREE",
      //       startDate,
      //       endDate: moment(startDate).add(1, "M").toDate(),
      //       tenure: 1,
      //     };
      //     const AccountCreated = await AccountController.createAccount({
      //       name,
      //       emailToken,
      //       email: email.toLowerCase(),
      //       changeEmail: email.toLowerCase(),
      //       password: hash,
      //       paymentStatus,
      //     });
      //     const Account = AccountCreated.toJSON();
      //     AccountPostWork.accountCreationPostWork(Account);
      //     const jwtToken = GlobalController.generateJWTToken(Account);
      //     return {
      //       payload: Account,
      //       token: jwtToken,
      //       message: "User Registered Successfully",
      //       status: 200,
      //     };
      //   } catch (error) {
      //     logger.error(error);
      //     throw new ApolloError(error.message, error.extensions.code);
      //   }
      console.log({ data });
      return data;
    },
  },
};

module.exports = AccountResolver;
