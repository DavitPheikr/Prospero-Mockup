import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'pages/homescreen/home_screen.dart';

void main() => runApp(const CooperativeApp());

class CooperativeApp extends StatelessWidget {
  const CooperativeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cooperative X',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        primaryColor: const Color(0xFF004C97),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF004C97),
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.latoTextTheme(),
        useMaterial3: true,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            backgroundColor: const Color(0xFF005EA9),
            foregroundColor: Colors.white,
          ),
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
