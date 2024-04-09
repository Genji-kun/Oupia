// "use client"

// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';

// export function withAuthRedirect(Component: any) {
//     return function AuthenticatedComponent(props: any) {
//         const router = useRouter();
//         const { user } = useSelector((state: any) => state.currentUserSlice);

//         if (user) {
//             router.push("/");
//             return null;
//         } else {
//             return <Component {...props} />;
//         }
//     }
// }

// export function withLoginRedirect(Component: any) {
//     return function AuthenticatedComponent(props: any) {
//         const router = useRouter();
//         const { user } = useSelector((state: any) => state.currentUserSlice);

//         if (!user) {
//             router.push("/sign-in");
//             return null;
//         }

//         return <Component {...props} />;
//     }
// }