import 'package:cooperative_x/components/gradient_button.dart';
import 'package:cooperative_x/models/client.dart';
import 'package:flutter/material.dart';

// Member data structure matching the Next.js component
class Member {
  final String cif;
  final String name;
  final String email;
  final String joinDate;
  final List<Transaction> transactions;

  Member({
    required this.cif,
    required this.name,
    required this.email,
    required this.joinDate,
    required this.transactions,
  });
}

class Transaction {
  final String id;
  final String date;
  final String type;
  final String accountType;
  final double amount;
  final String description;

  Transaction({
    required this.id,
    required this.date,
    required this.type,
    required this.accountType,
    required this.amount,
    required this.description,
  });
}

class ClientsPage extends StatefulWidget {
  final List<Client> clients;
  final VoidCallback onCreateClient;

  const ClientsPage({
    super.key,
    required this.clients,
    required this.onCreateClient,
  });

  @override
  State<ClientsPage> createState() => _ClientsPageState();
}

class _ClientsPageState extends State<ClientsPage> {
  String selectedMemberId = '';
  String searchTerm = '';

  // Mock member data matching the Next.js component
  final List<Member> members = [
    Member(
      cif: "100001",
      name: "Andi Wijaya",
      email: "andi@koperasi.com",
      joinDate: "2022-03-15",
      transactions: [
        Transaction(id: "T001", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Mandatory", amount: 50000, description: "Bunga bulanan untuk simpanan wajib."),
        Transaction(id: "T002", date: "2024-07-10", type: "Distribusi SHU", accountType: "Mandatory", amount: 120000, description: "Pembagian SHU simpanan wajib."),
        Transaction(id: "T003", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Principal", amount: 70000, description: "Bunga bulanan untuk simpanan pokok."),
        Transaction(id: "T004", date: "2024-07-10", type: "Distribusi SHU", accountType: "Principal", amount: 150000, description: "Pembagian SHU simpanan pokok."),
      ],
    ),
    Member(
      cif: "100002",
      name: "Budi Santoso",
      email: "budi@koperasi.com",
      joinDate: "2021-11-02",
      transactions: [
        Transaction(id: "T005", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Mandatory", amount: 40000, description: "Bunga bulanan untuk simpanan wajib."),
        Transaction(id: "T006", date: "2024-07-10", type: "Distribusi SHU", accountType: "Mandatory", amount: 100000, description: "Pembagian SHU simpanan wajib."),
        Transaction(id: "T007", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Principal", amount: 60000, description: "Bunga bulanan untuk simpanan pokok."),
        Transaction(id: "T008", date: "2024-07-10", type: "Distribusi SHU", accountType: "Principal", amount: 130000, description: "Pembagian SHU simpanan pokok."),
        Transaction(id: "T009", date: "2024-07-02", type: "Setoran Sukarela", accountType: "Voluntary", amount: 300000, description: "Setoran sukarela anggota."),
        Transaction(id: "T010", date: "2024-07-05", type: "Penarikan Sukarela", accountType: "Voluntary", amount: -100000, description: "Penarikan dana sukarela oleh anggota."),
        Transaction(id: "T011", date: "2024-07-10", type: "Bunga Bulanan", accountType: "Voluntary", amount: 25000, description: "Bunga bulanan untuk simpanan sukarela."),
        Transaction(id: "T012", date: "2024-07-15", type: "Distribusi SHU", accountType: "Voluntary", amount: 50000, description: "Pembagian SHU simpanan sukarela."),
      ],
    ),
    Member(
      cif: "100003",
      name: "Citra Dewi",
      email: "citra@koperasi.com",
      joinDate: "2023-01-20",
      transactions: [
        Transaction(id: "T013", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Mandatory", amount: 35000, description: "Bunga bulanan untuk simpanan wajib."),
        Transaction(id: "T014", date: "2024-07-10", type: "Distribusi SHU", accountType: "Mandatory", amount: 90000, description: "Pembagian SHU simpanan wajib."),
        Transaction(id: "T015", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Principal", amount: 50000, description: "Bunga bulanan untuk simpanan pokok."),
        Transaction(id: "T016", date: "2024-07-10", type: "Distribusi SHU", accountType: "Principal", amount: 110000, description: "Pembagian SHU simpanan pokok."),
        Transaction(id: "T017", date: "2024-07-03", type: "Setoran Sukarela", accountType: "Voluntary", amount: 200000, description: "Setoran sukarela anggota."),
        Transaction(id: "T018", date: "2024-07-08", type: "Penarikan Sukarela", accountType: "Voluntary", amount: -50000, description: "Penarikan dana sukarela oleh anggota."),
        Transaction(id: "T019", date: "2024-07-10", type: "Bunga Bulanan", accountType: "Voluntary", amount: 20000, description: "Bunga bulanan untuk simpanan sukarela."),
        Transaction(id: "T020", date: "2024-07-15", type: "Distribusi SHU", accountType: "Voluntary", amount: 40000, description: "Pembagian SHU simpanan sukarela."),
      ],
    ),
    Member(
      cif: "100004",
      name: "Dewi Lestari",
      email: "dewi@koperasi.com",
      joinDate: "2022-07-05",
      transactions: [
        Transaction(id: "T021", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Mandatory", amount: 30000, description: "Bunga bulanan untuk simpanan wajib."),
        Transaction(id: "T022", date: "2024-07-10", type: "Distribusi SHU", accountType: "Mandatory", amount: 80000, description: "Pembagian SHU simpanan wajib."),
        Transaction(id: "T023", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Principal", amount: 40000, description: "Bunga bulanan untuk simpanan pokok."),
        Transaction(id: "T024", date: "2024-07-10", type: "Distribusi SHU", accountType: "Principal", amount: 90000, description: "Pembagian SHU simpanan pokok."),
      ],
    ),
    Member(
      cif: "100005",
      name: "Eko Prasetyo",
      email: "eko@koperasi.com",
      joinDate: "2024-02-10",
      transactions: [
        Transaction(id: "T025", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Mandatory", amount: 25000, description: "Bunga bulanan untuk simpanan wajib."),
        Transaction(id: "T026", date: "2024-07-10", type: "Distribusi SHU", accountType: "Mandatory", amount: 70000, description: "Pembagian SHU simpanan wajib."),
        Transaction(id: "T027", date: "2024-07-01", type: "Bunga Bulanan", accountType: "Principal", amount: 30000, description: "Bunga bulanan untuk simpanan pokok."),
        Transaction(id: "T028", date: "2024-07-10", type: "Distribusi SHU", accountType: "Principal", amount: 60000, description: "Pembagian SHU simpanan pokok."),
      ],
    ),
  ];

  List<Member> get filteredMembers {
    if (searchTerm.isEmpty) return members;
    return members.where((member) =>
      member.cif.toLowerCase().contains(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().contains(searchTerm.toLowerCase())
    ).toList();
  }

  String getAccountTypes(Member member) {
    final accountTypes = member.transactions.map((t) => t.accountType).toSet();
    return accountTypes.map((type) {
      switch (type) {
        case 'Mandatory': return 'Wajib';
        case 'Principal': return 'Pokok';
        case 'Voluntary': return 'Sukarela';
        default: return type;
      }
    }).join(', ');
  }

  double getTotalBalance(Member member) {
    return member.transactions.fold(0.0, (sum, transaction) => sum + transaction.amount);
  }

  String formatCurrency(double amount) {
    return 'Rp${amount.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}';
  }

  String formatDate(String dateString) {
    final date = DateTime.parse(dateString);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return '${date.day} ${months[date.month - 1]} ${date.year}';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFF5F6FA), // Background matching Next.js
      child: Container(
        margin: EdgeInsets.all(32),
        padding: EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Page Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Daftar Transaksi Anggota',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF495057),
                  ),
                ),
              ],
            ),
            SizedBox(height: 32),
            
            // Filter Panel
            Container(
              padding: EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Color(0xFFF8F9FA),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Color(0xFFE9ECEF)),
              ),
              child: Row(
                children: [
                  // Member Dropdown
                  Expanded(
                    flex: 2,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Pilih Anggota',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF495057),
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Color(0xFFCED4DA)),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              value: selectedMemberId.isEmpty ? null : selectedMemberId,
                              hint: Text('Semua Anggota', style: TextStyle(color: Color(0xFF6C757D))),
                              isExpanded: true,
                              items: [
                                DropdownMenuItem<String>(
                                  value: '',
                                  child: Text('Semua Anggota'),
                                ),
                                ...members.map((member) => DropdownMenuItem<String>(
                                  value: member.cif,
                                  child: Text('${member.name} (CIF: ${member.cif})'),
                                )),
                              ],
                              onChanged: (value) {
                                setState(() {
                                  selectedMemberId = value ?? '';
                                });
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 24),
                  // Search Field
                  Expanded(
                    flex: 2,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Cari ID/Nama Anggota',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF495057),
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Color(0xFFCED4DA)),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: TextField(
                            onChanged: (value) => setState(() => searchTerm = value),
                            decoration: InputDecoration(
                              hintText: 'Masukkan ID atau Nama...',
                              hintStyle: TextStyle(color: Color(0xFF6C757D)),
                              border: InputBorder.none,
                              prefixIcon: Icon(Icons.search, color: Color(0xFF6C757D)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 24),
                  // Reset Button
                  Expanded(
                    flex: 1,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 22),
                        ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedMemberId = '';
                              searchTerm = '';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xFF6C757D),
                            foregroundColor: Colors.white,
                            padding: EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                          child: Text('Reset'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            SizedBox(height: 32),
            
            // Members Table
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    // Main table container
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: Color(0xFFE9ECEF)),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Table(
                        columnWidths: {
                          0: FlexColumnWidth(1),
                          1: FlexColumnWidth(2),
                          2: FlexColumnWidth(2.5),
                          3: FlexColumnWidth(2),
                          4: FlexColumnWidth(1.5),
                          5: FlexColumnWidth(1.5),
                          6: FlexColumnWidth(1.2),
                        },
                        children: [
                          // Header row
                          TableRow(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                colors: [Color(0xFF5084D4), Color(0xFF4A7BC8)],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ),
                            ),
                            children: [
                              _buildHeaderCell('CIF'),
                              _buildHeaderCell('Nama'),
                              _buildHeaderCell('Email'),
                              _buildHeaderCell('Tanggal Bergabung'),
                              _buildHeaderCell('Akun Dimiliki'),
                              _buildHeaderCell('Total Saldo'),
                              _buildHeaderCell('Aksi'),
                            ],
                          ),
                          // Data rows
                          ...filteredMembers.asMap().entries.map((entry) {
                            final index = entry.key;
                            final member = entry.value;
                            final isEven = index % 2 == 0;
                            final isSelected = selectedMemberId == member.cif;
                            
                            return TableRow(
                              decoration: BoxDecoration(
                                color: isSelected 
                                  ? Color(0xFFE3F2FD)
                                  : (isEven ? Colors.white : Color(0xFFF8F9FA)),
                              ),
                              children: [
                                _buildDataCell(member.cif, fontWeight: FontWeight.w600),
                                _buildDataCell(_getFirstLastName(member.name)),
                                _buildDataCell(member.email),
                                _buildDataCell(formatDate(member.joinDate)),
                                _buildDataCell(getAccountTypes(member)),
                                _buildDataCell(formatCurrency(getTotalBalance(member))),
                                _buildActionCell(member),
                              ],
                            );
                          }).toList(),
                        ],
                      ),
                    ),
                    
                    // Transaction details table
                    if (selectedMemberId.isNotEmpty) ...[
                      SizedBox(height: 32),
                      Container(
                        decoration: BoxDecoration(
                          border: Border.all(color: Color(0xFFE9ECEF)),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Table(
                          columnWidths: {
                            0: FlexColumnWidth(1.5),
                            1: FlexColumnWidth(1.2),
                            2: FlexColumnWidth(1.5),
                            3: FlexColumnWidth(1.2),
                            4: FlexColumnWidth(1.5),
                            5: FlexColumnWidth(3),
                          },
                          children: [
                            // Transaction header
                            TableRow(
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [Color(0xFFE3F2FD), Color(0xFFF8F9FA)],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                              ),
                              children: [
                                _buildTransactionHeaderCell('ID Transaksi'),
                                _buildTransactionHeaderCell('Tanggal'),
                                _buildTransactionHeaderCell('Jenis'),
                                _buildTransactionHeaderCell('Jenis Akun'),
                                _buildTransactionHeaderCell('Jumlah'),
                                _buildTransactionHeaderCell('Deskripsi'),
                              ],
                            ),
                            // Transaction data rows
                            ...members
                                .firstWhere((m) => m.cif == selectedMemberId)
                                .transactions
                                .asMap()
                                .entries
                                .map((entry) {
                              final index = entry.key;
                              final transaction = entry.value;
                              final isEven = index % 2 == 0;
                              
                              return TableRow(
                                decoration: BoxDecoration(
                                  color: isEven ? Colors.white : Color(0xFFF8F9FA),
                                ),
                                children: [
                                  _buildDataCell(transaction.id, fontWeight: FontWeight.w600),
                                  _buildDataCell(transaction.date),
                                  _buildDataCell(transaction.type),
                                  _buildDataCell(transaction.accountType),
                                  _buildDataCell(
                                    formatCurrency(transaction.amount),
                                    color: transaction.amount >= 0 ? Color(0xFF28A745) : Color(0xFFDC3545),
                                    fontWeight: FontWeight.w600,
                                  ),
                                  _buildDataCell(transaction.description),
                                ],
                              );
                            }).toList(),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeaderCell(String text) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Text(
        text,
        style: TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w600,
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _buildTransactionHeaderCell(String text) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Text(
        text,
        style: TextStyle(
          color: Color(0xFF094B9C),
          fontWeight: FontWeight.w600,
          fontSize: 15,
        ),
      ),
    );
  }

  Widget _buildDataCell(String text, {FontWeight? fontWeight, Color? color}) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 14,
          fontWeight: fontWeight,
          color: color ?? Color(0xFF495057),
        ),
      ),
    );
  }

  Widget _buildActionCell(Member member) {
    return Container(
      padding: EdgeInsets.all(16),
      alignment: Alignment.center,
      child: ElevatedButton(
        onPressed: () {
          setState(() {
            selectedMemberId = member.cif;
          });
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white, // $backgrounds-secondary
          foregroundColor: Color(0xFF455A64), // $brand-dark-gray
          side: BorderSide(
            color: Color(0xFFE5E7EB).withOpacity(0.6), // $ui-border-gray
            width: 2,
          ),
          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 14), // 0.875rem 1.5rem
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          elevation: 2,
          shadowColor: Colors.black.withOpacity(0.1),
        ),
        child: Text(
          'View Details',
          style: TextStyle(
            fontSize: 16, // $font-base
            fontWeight: FontWeight.bold, // $weight-bold
          ),
        ),
      ),
    );
  }

  String _getFirstLastName(String fullName) {
    final parts = fullName.split(' ');
    if (parts.length > 1) {
      return '${parts[0]} ${parts.sublist(1).join(' ')}';
    }
    return fullName;
  }
}
