# PesaQuest

PesaQuest tracks KES transactions, monthly spending and savings targets. Account sign-in, budgets and the transaction ledger use Supabase.

## Connect your Supabase project

1. In your Supabase project's **SQL Editor**, run [supabase/schema.sql](supabase/schema.sql). The script can be run again safely.
2. Copy `PesaQuest/.env.example` to `PesaQuest/.env.local`. Set `VITE_SUPABASE_URL` to your project URL and `VITE_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key. A legacy `anon` key also works. Keep secret and `service_role` keys out of the browser app.
3. Enable the Email provider in Supabase Authentication. In **URL Configuration**, set the Site URL to the address where you use the app and allow `http://localhost:5173` for local confirmation links. If deploying, also allow the deployed app's URL. If email confirmation is enabled, users must confirm their address when creating an account.
4. Use Node.js 22.12+ or a supported newer release. From this repository's root, run the following commands and open the address Vite prints.

   ```sh
   npm ci --prefix PesaQuest
   npm run dev
   ```

5. Create an account or sign in. Log a transaction, update the allocation and savings target, then reload to confirm the values persist. Use **Refresh** to load changes made in another tab or device.

## Build and deploy

Run `npm run lint` and `npm run build` from the repository root. The static build is in `PesaQuest/dist`. For hosting that builds from source, use `PesaQuest` as the project directory and set the two public Supabase environment variables before building.

## Existing records

The schema preserves existing `demo` rows and removes their public access. If those rows belong to you, an administrator can assign them to your authenticated user by changing their `owner_key` to your Supabase user UUID. Check for an existing budget for that UUID before moving the demo budget because each account can have only one budget. Any earlier transactions that existed only in an open browser page were never saved to Supabase.
