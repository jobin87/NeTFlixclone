// const [activeTab, setActiveTab] = useState(0);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate()

//   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };

//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpen(open);
//   };

//   const handleAccountSettings = () => {
//     console.log("Navigating to Account Settings...");
//   };

//   const handleLogout = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await makeNetworkCall({
//         method: API_METHODS.POST,
//         url: ENDPOINT_USER_LOGOUT,
//       });
//       if (response?.data?.loggedOut) {
//         dispatch(requestSignOut())
//         navigate(paths.auth.signIn)
        
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//           <Box
//             sx={{ width: 250, padding: 2 }}
//             role="presentation"
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//           >
//             <List>
//               <ListItem component="button" onClick={handleAccountSettings}>
//                 <ListItemIcon>
//                   <SettingsIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Account Settings" />
//               </ListItem>
//               <ListItem component="button" onClick={handleLogout}>
//                 <ListItemIcon>
//                   <ExitToAppIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Logout" />
//               </ListItem>
//             </List>
//           </Box>
//         </Drawer>
